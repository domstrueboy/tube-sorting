// Это основной файл с логикой
var Tube, Pair, makeField; // Объявляем переменные для хранения в них в дальнейшем объекта Трубки, Пары трубок, поля с вычисленными значениями сочетаний трубок

// В проекте для хранения данных используется база данных LowDB. Собственно, база хранится в файле JSON, это текстовый формат, его можно читать и изменять в любом текстовом редакторе.
// Инициализция lowdb и загрузка базы данных:
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('../База_данных/db.json')
const db = low(adapter)

// Если база ещё не создана, то она создаётся с такой структурой по-умолчанию:
db.defaults({ 
			       state: { 
               sensor: 'Du50',
  					   sensors: [ 'Du50', 'Du50_2', 'Du15', 'Du5', 'Du3', 'Du2' ],
  	           Du50:
               {
  	          		criteriaMax: 2,
  	          		sortField: 'byCriteria'
  	          	}
  	         },
	          
	           preferences: {},

      			 tubes: { Du50: [] },
      	     pairs: { Du50: [] },
      	     archieve: { Du50: [] }
      	  
             }).write();

// Для "реактивной" связи данных с интерфейсом используется фреймворк VueJS. Реактивная связь: если данные меняются, интерфейс отрисовывает это автоматически. И наоборот.
// Инициализация экземпляра приложения Vue.js
var app = new Vue({
  el: '#app', // В файле index.html есть div с id 'app'. Приложение будет работать в нём

  data: // Объект data - во VueJS здесь хранятся все данные приложения. Структура внутри data - любая.
        //Данные доступны извне объекта через this или app, например this.state.sensor содержит выбранный в данный момент сенсор
  {
  	state: // Здесь я буду хранить состояние приложения:
    {
  		sensor:      db.get('state.sensor').value(), // Выбранный сенсор. Начальное значение запрашивается из базы данных.
  		sensors:     [ "Du3" ], // В данном случае оставил только Du3, но если нужны все датчики, доступные в базе, то из базы можно запросить их так: db.get('state.sensors' ).value(),
  		criteriaMax: db.get('state.' + db.get('state.sensor').value() + '.criteriaMax').value() || 1000, // Пары с критерием не более заданного показываются в таблице отбора. В базе хранится отдельно для каждого датчика
      sortField:   db.get('state.' + db.get('state.sensor').value() + '.sortField'  ).value() || 'byCriteria', // Столбец, по которому сортируются пары в Таблице отбора. В базе хранится отдельно для каждого датчика
      maxCriteriaForMeasurements:   db.get('state.' + db.get('state.sensor').value() + '.maxCriteriaForMeasurements'  ).value() || 1.5, // Если критерий для измерений трубки выше данного, то в таблице она подсвечивается красным
      sort: ''
  	},
  	
  	inputs: {}, // Значения в полях ввода трубки
    tubes: [], // Массив для хранения всех Трубок в наличии
    pairs: [], // Пары трубок в таблице Подобранные пары
    archieve: [], // Архив пар
  },

  computed: // объект computed во VueJS содержит вычисляемые значения. Они вычисляются на основе заданных функций, в которые входят переменные из data.
            // Если значение переменной из data изменяется, то значения функции пересчитывается.
  {
    // Загрузка шаблона для окна ввода параметров:
    inputs_template: function() // Здесь хранятся объекты для хранения значений из полей ввода. Они разные для каждого изделия и загружаются при изменения значения выбранного сенсора this.state.sensor
                                // В объекты сразу заведены значения по-умолчанию
    {
      if(this.state.sensor === 'Du3')
      { // _id - идентификатор трубки, MM - масса заготовки, l - длина заготовки, dim1...dim12 - измерения в оснастке с 1 по 12
        this.inputs = { _id: '', MM: 15.5, l: 461, dim1: 5, dim2: 5, dim3: 5, dim4: 5, dim5: 5, dim6: 5, dim7: 5, dim8: 5, dim9: 5, dim10: 5, dim11: 5, dim12: 5 };
      }
      else if(this.state.sensor === 'Du15')
      {
        this.inputs = { _id: '', MM: 216, l: 919, L: 48.75, R: 48.75, C: 5.5, A: 129, RL: 36.5, RR: 36.5 };
      }
      else if(this.state.sensor === 'Du50')
      {
        this.inputs = { _id: '', MM: 3027.76, l: 1500, M: 2560, dim1: 0, dim2: 0, dim3: 0, dim4: 0 };
      }
      else if(this.state.sensor === 'Du50_2')
      {
        this.inputs = { _id: '', MM: 2450, l: 1500, M: 2000, dim1: 0, dim2: 0, dim3: 0, dim4: 0 };
      }

      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_inputs')
    },


    // Загрузка шаблонов для таблицы отбора (шапка и тело таблицы)
    tubes_template_th: function()
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_tubes_th')
    },
    tubes_template_tb: function()
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_tubes_tb')
    },


    // Загрузка шаблонов для таблицы отбора (шапка и тело таблицы)
    field_template_th: function() // шапка
    {
      this.state.criteriaMax = db.get('state.' + db.get('state.sensor').value() + '.criteriaMax').value();
      this.state.sortField   = db.get('state.' + db.get('state.sensor').value() + '.sortField'  ).value();

      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_field_th')
    },
    field_template_tb: function() // тело таблицы
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_field_tb')
    },


    // Загрузка шаблонов для таблицы подобранных пар (шапка и тело таблицы)
    pairs_template_th: function() // шапка
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_pairs_th')
    },
    pairs_template_tb: function() // тело таблицы
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_pairs_tb')
    },


    // Загрузка шаблонов для таблицы пар в архиве (шапка и тело таблицы)
    archieve_template_th: function() // шапка
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_archieve_th')
    },
    archieve_template_tb: function() // тело таблицы
    {
      return require('./components/' + this.state.sensor + '/' + this.state.sensor + '_archieve_tb')
    },

    // Расчёт таблицы отбора (всех возможных сочетаний трубок)
    field: function() // Расчёт производится как "поле" всех возможных сочетаний трубок, при этом отфильтровываются повторные пара (а+б=б+а) и пары
                      // с критерием качества больше this.state.criteriaMax, пары сортируются по критерию либо по пересечениям пар (в зависимости от
                      // значения this.state.sortField). Расчёт производится с помощью функции makeField, импортируемой из папки modules для определённого изделия
    {
      makeField = require('./modules/' + this.state.sensor + '/' + this.state.sensor + '_makeField');
  		return makeField( this.state.sensor, this.state.criteriaMax, this.state.sortField, this.tubes.filter(function(element){
  			return element.pair === '';
  		}) );
  	},

    // Сортировка таблицы отбора по критерию качества
    isByCriteria: function()
    {
      return this.state.sortField === 'byCriteria';
    },

    // Сортировка таблицы отбора по количеству пересечений с другими парами
    isByIntersection: function()
    {
      return this.state.sortField === 'byIntersection'
    }
  },

  created: function() // В объекте created во VueJS хранятся функции, выполняемые после создания экземпляра приложения Vue
                      // В данном случае мы здесь запрашиваем из базы все трубки и подобранные пары для определённого изделия и помещаем их
                      // в массивы tubes и pairs. При этом, т.к. tubes и pairs не просто массивы, а переменные, которые находятся в data, то они
                      // реактивно связаны с интерфейсом. Т.е. Полученные трубки и пары отображаются в соответствующих таблицах
  {
    Tube = require('./modules/' + this.state.sensor + '/' + this.state.sensor + '_Tube'); // запрос класса трубки из модулей, хранящихся в modules

    let buf = db.get( 'tubes.' + this.state.sensor ).value(); // Запрос данных трубок из базы

    for( let i in buf ) {
      this.tubes.push( new Tube( buf[i] ) ); // Создание экземпляров класса трубки для каждой записи из базы и добавление их в массив tubes
    };

    // То же что для трубок, проделываем с парами:
    Pair = require('./modules/' + this.state.sensor + '/' + this.state.sensor + '_Pair');

    buf = db.get( 'pairs.' + this.state.sensor ).value();

    for( let i in buf ) {
      this.pairs.push( new Pair( buf[i].id1, buf[i].id2, buf[i].criteria, buf[i].intersection, buf[i].tube1, buf[i].tube2 ) );
    };
  },

  watch: // в этом объекте во VueJS хранятся функции, которые выполняются при изменении отслеживаемой переменной. При этом, в отличие от computed,
         // эти функции ничего не возвращают и не вычисляют "зависимых" переменных. В данном случае при изменениях в state из базы перезапрашиваются
         // трубки и пары. После этого, кстати, т.к. массивы tubes и pairs изменятся, сработает секция computed, которая пересчитает, например, field
         // и перезагрузит шаблоны интерфейса 
  {
    state:
    {
      handler: function()
      {
        db.set( 'state.sensor', this.state.sensor )
          .write();

        this.inputs = {};

        Tube = require('./modules/' + this.state.sensor + '/' + this.state.sensor + '_Tube');

        let buf = db.get( 'tubes.' + this.state.sensor ).value();

        this.tubes = [];

        for( let i in buf ) {
          this.tubes.push( new Tube( buf[i] ) );
        };
        

        Pair = require('./modules/' + this.state.sensor + '/' + this.state.sensor + '_Pair');

        buf = db.get( 'pairs.' + this.state.sensor ).value();

        this.pairs = [];

        for( let i in buf ) {
          this.pairs.push( new Pair( buf[i].id1, buf[i].id2, buf[i].criteria, buf[i].intersection, buf[i].tube1, buf[i].tube2 ) );
        };
      },
      deep: true
    },
  },

  methods: { // В этом объекте во VueJS содержатся "методы", т.е. по большому счёту просто функции, которые можно вызывать

    addTube: function(tube) // Метод для добавления трубки. Используется как при добавлении новой трубки пользователем из интерфейса, так и при
                            // "восстановлении" трубок из базы, т.е. при чтении данных из базы и наполнении массива tubes экземплярами класса Tube
                            // на основе этих данных.
  	{
  		if(tube === undefined) // создание трубки с использованием интерфейса
  		{
	  		let idFlag = db.get( 'tubes.' + app.state.sensor ) // получаем из базы список трубок
	  		.find({ _id: app.inputs._id + '' }) // проверяем, нет ли уже в базе трубки с введённым id
	  		.value() // если такой трубки ещё нет, то idFlag = undefined

	  		if( idFlag === undefined ) // Если трубки с введённым id ещё нет в базе (см. проверку выше), то вносим её
	  		{
          let params = []; // Заводим массив для хранения обмеров,
          params.push({}); // каждый "обмер" - элемент массива - объект с именованными измерениями. Одна трубка может быть обмерена несколько раз,
                           // поэтому обмеры хранятся в массиве. Каждый объект "обмера" хранит все измерения трубки.
          let inputs = app.inputs; // сокаращем app.inputs до inputs (просто для удобства). inputs - это значения в полях ввода трубки
          for (let key in inputs) { // Проходим по inputs. Для всех ключей, кроме _id, создаём соответствующий ключ-значение в params[0]
            if (inputs[key] !== '_id') {
              params[0][key] = inputs[key];
            }
          }

  				let newTube = new Tube({ // Создаем объект класса Tube, в который передаём id и измерения
            _id: app.inputs._id,
            params: params
          });

		  		db.get( 'tubes.' + app.state.sensor ) // Добавляем эту трубку в базу
				  .push( newTube )
				  .write();

				  app.tubes.push(newTube); // Добавляем её также и в массив tubes для использования в программе
	  		}
        else // Если трубка с таким id уже есть в базе, тогда выводится предупреждение. В старой версии программы добавление просто запрещалось.
             // Сейчас при желании можно добавить этой трубке ещё один "обмер"
        {
          if (window.confirm(`Хотите добавить измерение для трубки №${app.inputs._id}? (Трубка с таким номером уже существует)`)) { 
            let id = app.inputs._id;
            app.addMeasurement(id); // Добавляем "обмер" объекту трубки с определённым id
            let tube = app.tubes[app.tubes.findIndex( function(element){ return element._id === id; } )]; // Находим эту трубку (весь объект)
            app.editTube(tube); // Редактируем её (т.е., по факту, удаляем и пересоздаём с обновлёнными данными)
          }
	  		}
	  	}
	  	else // восстановление объекта трубки из базы
	  	{
	  		let idFlag = db.get( 'tubes.' + app.state.sensor ) // То же, что в предыдущем блока - но теперь на всякий случай - проверяем, нет ли уже такой трубки в базе
	  		.find({ _id: tube._id })
	  		.value()

	  		if( idFlag === undefined ) // Если такой трубки ещё нет, то добавляем
	  		{
  				let newTube = new Tube( tube ); // Создаём объект трубки по данным из базы

		  		db.get( 'tubes.' + app.state.sensor ) // Добавляем её в базу
				  .push( newTube )
				  .write();

				app.tubes.push(newTube); // Добавляем её также и в массив tubes для использования в программе
	  		}
	  		else // Если такая трубка уже есть, то не добавляем её и выводим предупреждение об этом. По идее при чтении из базы такая ситуация произойти не должна
        {
	  			alert('Трубка с таким номером уже существует');
	  		}
	  	}
  	},

    removeTube: function(id) // Удаление трубки по id
    {
      if( arguments[1] === 'no-check' || confirm("Удалить трубку №" + id + " ?") ) // Если при удалении после id не передан аргумент 'no-check',
                                                                                   // то перед удалением выводится окошко подтверждения удаления
                                                                                   // Аргумент 'no-check' нужен для того, чтобы использовать метод
                                                                                   // для при редактировании трубки - сначала её удалить, потом
                                                                                   // создать вновь с новыми данными. В таком случае запрос на
                                                                                   // подтверждение удаления не нужен
      { 
        db.get( 'tubes.' + app.state.sensor ) // Удаляем трубку из базы
          .remove({ _id: id })
          .write();

        app.tubes.splice( app.tubes.findIndex( function(element){ return element._id === id; } ),  1 ); // Удаляем трубку из массива tubes
                                                                                                        // Интерфейс реагирует - перерисовывает обновлённую таблицу
      }
    },

    editTube: function(tube) // Редактирование трубки
    {
      this.removeTube(tube._id, "no-check"); // Сначала удаляем трубку
      let params = []
      for (let i = 0; i < tube.params.length; i++) { // Из всех записей "обмеров" удаляем рассчитанные параметры M, d, Freq, Def, m, createTime, editTime
                                                     // Это те параметры, которые не вводятся из интерфейса, а рассчитываются при создании объекта типа Tube
        delete tube.params[i].M;
        delete tube.params[i].d;
        delete tube.params[i].Freq;
        delete tube.params[i].Def;
        delete tube.params[i].m;
        delete tube.params[i].createTime;
        delete tube.params[i].editTime;
        params.push(tube.params[i]); // Все оставшиеся параметры сохраняем во временный массив params
      }
      this.addTube({ // Теперь с помощью метода addTube создаём новую трубку, в которую передаём id, данные из params, параметр выбранного измерения
                     // selected, подобранную пару pair. В аргументе tube метода, конечно, должна быть трубка с новыми значениями параметров
        _id: tube._id,
        params: params,
        selected: tube.selected,
        pair: tube.pair
      });
    },

    addMeasurement: function(id) { // Добавление ещё одного "обмера" для определённой трубки
      let tube = app.tubes[app.tubes.findIndex( function(element){ return element._id === id; } )]; // Находим трубку

      let measurement = {}; // Создаем объект под хранение измерений
      let inputs = app.inputs; // Сокращаем app.inputs (может и не надо)
      for (let key in inputs) { // Проходим по полям ввода, собираем значения и помещаем их под соответствующими ключами в объект measurement
        if (inputs[key] !== '_id') {
          measurement[key] = inputs[key];
        }
      }

      tube.addMeasurement(measurement); // Добавляем "обмер", собственно, в трубку, с помощью встроенного в класс Tube метода
    },

    removeMeasurement: function(obj) { // Удаление "обмера" из трубки
      let id   = obj.id,
          num  = obj.num,
          tube = app.tubes[app.tubes.findIndex( function(element){ return element._id === id; } )]; // Находим трубку
      if (tube.selected === num) { // Если обмер является "выбранным", т.е. учитывается при подборе пар, то его нельзя удалить.
                                   // Нужно либо сначала выбрать другой обмер, либо можно удалить трубку целиком, но уже другим методом 
        alert('Нельзя удалять выбранное измерение');
      }
      else {
        tube.removeMeasurement(num); // Иначе - удаляем обмер в помощью встроенного в класс Tube метода
      }
    },

    addPair: function(pair) // Добавить пару трубок
    {
      // Находим обе трубки
    	app.tubes[app.tubes.findIndex(function(element){
    		return element._id === pair.id1;
    	})].pair = pair.id2;
    	app.tubes[app.tubes.findIndex(function(element){
    		return element._id === pair.id2;
    	})].pair = pair.id1;

      // Для каждой трубки заполняем свойство pair. Вписываем туда id другой трубки
      db.get( 'tubes.' + app.state.sensor )
    		.find({ _id: pair.id1 })
			  .assign({ pair: pair.id2 })
			  .write();

		  db.get( 'tubes.' + app.state.sensor )
    		.find({ _id: pair.id2 })
			  .assign({ pair: pair.id1 })
			  .write();

      // И снова находим трубки (да, можно было не делать 2 раза)
		  let tube1 = app.tubes[app.tubes.findIndex(function(element){ return element._id === pair.id1; })];
      let tube2 = app.tubes[app.tubes.findIndex(function(element){ return element._id === pair.id2; })];
    	let currentPair = new Pair(pair.id1, pair.id2, pair.criteria, pair.intersection, tube1, tube2); // Создаём новый объект класса Pair

    	app.pairs.push(currentPair); // Добавляем пару в массив pairs (хранится в data)(интерфейс, как всегда, реагирует - перерисовывает таблицу Подбранных пар)

    	db.get( 'pairs.' + app.state.sensor ) // Добавляем пару в базу
			.push( currentPair )
			.write();
    },

    removePair: function(pair,index) // Удаление пары
    {
    	app.pairs.splice(index, 1); // Удаление из pairs

    	db.get( 'pairs.' + app.state.sensor ) // Удаление из базы
			.remove({ id1: pair.id1, id2: pair.id2 })
			.write();

      // Находим трубки, входившие в пару:
    	app.tubes[app.tubes.findIndex(function(element){ 
    		return element._id === pair.id1;
    	})].pair = '';
    	app.tubes[app.tubes.findIndex(function(element){
    		return element._id === pair.id2;
    	})].pair = '';

      // Чистим поля pair у этих трубок
    	db.get( 'tubes.' + app.state.sensor )
    		.find({ _id: pair.id1 })
			.assign({ pair: "" })
			.write();

		  db.get( 'tubes.' + app.state.sensor )
    		.find({ _id: pair.id2 })
			  .assign({ pair: "" })
			  .write();
    },

    viewArchieve: function() // Метод просмотра архива трубок. Он просто читает из базы раздел archieve и помещает его в виде объектов класса Pair
                             // в массив archieve, хранящийся в data. Так же, как со всеми остальными переменными из data, интерфейс заполняет таблицу
                             // Архив, когда в интерфейсе вызывается модальное окно отображения архива. 
    {
    	app.archieve = [];

    	let buf = db.get( 'archieve.' + this.state.sensor ).value();

	  	for( let i in buf ) {
	  		this.archieve.push( new Pair( buf[i].id1, buf[i].id2, buf[i].criteria, buf[i].intersection, buf[i].tube1, buf[i].tube2 ) );
	  	};
    },

    addPairToArchieve: function(pair, index) // Убрать пару в архив - когда пара уже подобрана для использования в изготовлении датчика, её нужно убрать в архив
    {
    	this.removePair(pair, index); // Удаляем пару (сразу и из массива и из базы)
    	this.removeTube(pair.id1); // Удаляем соответствующие паре трубки (сразу и из массива и из базы)
    	this.removeTube(pair.id2);

    	app.archieve.push(pair); // Добавляем в массив archieve пару
    	db.get( 'archieve.' + app.state.sensor ) // Добавляем пару в раздел archieve базы
			.push( pair )
			.write();
    },

    returnPairFromArchieve: function(pair, index) // Возврат пары обратно в отбор (в случае, например, ошибочного добавления)
    {
    	this.addTube(pair.tube1); // Восстанавливаем трубки с использованием данных пары из архива
    	this.addTube(pair.tube2);
    	this.addPair(pair); // Восстанавливаем пару в Таблице подобранных пар

    	app.archieve.splice(index, 1); // Удаляем пару из массива archieve
    	db.get( 'archieve.' + app.state.sensor ) // Удаляем пару из архива в базе
			.remove({ id1: pair.id1, id2: pair.id2 })
			.write();
    },

    saveCriteriaMax: function() // CriteriaMax - это значение критерия качества пары. Пары с критерием выше заданного не будут отображаться в Таблице отбора,
                                // иначе их слишком много (10'000 сочетаний для 100 трубок, например), долго мотать таблицу
    {
      // Значение берётся из соответствующего поля ввода (см. шапку Таблицы отбора) и обрабатывается - подрезаются пробелы, запятая меняется на точку, удаляются минусы:
      let buf = parseFloat(document.getElementById("criteriaMax").value.trim().replace(' ', '').replace(',', '.').replace('-', ''))
      if (buf > 0 ) { // Если введено положительное число (перестаховываюсь, минусы по идее уже удалены)
        app.state.criteriaMax = buf // Соответствующей переменной в data присваивается значение, полученное и преобразованное из поля ввода 
        db.set( 'state.' + app.state.sensor + '.criteriaMax', app.state.criteriaMax ) // То же значение пишется в базу
        .write();
        db.get('state.' + db.get('state.sensor').value() + '.criteriaMax').value() // Здесь зачем-то читается это значение из базы. По-моему это ошибка, можно просто удалить
      }
      else { // В случае неправильно введённого значения:
        document.getElementById("criteriaMax").value = app.state.criteriaMax // Значение в поле ввода сбрасывается на последнее сохранённое
        alert("Ошибка. Введите НОРМАЛЬНОЕ число") // Выдаётся диалог с сообщением об ошибке
      }
    },

    saveSort: function() // sort - столбец, по которому происходит сортировка в таблице отбора. По-умолчанию сортировка происходит по критерию качества
                         // В данном случае берём значение из поля ввода sort и сохраняем его в переменную
    {
      app.state.sort = document.getElementById("sort").value
    },

    saveSortField: function (val) { // sortField - столбец, по которому происходит сортировка в таблице отбора.
                                    // По-умолчанию сортировка происходит по критерию качества
      this.state.sortField = val;

      db.set( 'state.' + this.state.sensor + '.sortField', this.state.sortField )
      .write();
    },
    
    sortField: function(a, b) {

      if (this.state.sortField === 'byCriteria') {
        return a.criteria - b.criteria;
      }
      else if (this.state.sortField === 'byIntersection') {
        return a.intersection - b.intersection;
      }
    },

    saveMaxCriteriaForMeasurements: function() {
      db.set( 'state.' + this.state.sensor + '.maxCriteriaForMeasurements', this.state.maxCriteriaForMeasurements )
      .write();
    }
  }
});