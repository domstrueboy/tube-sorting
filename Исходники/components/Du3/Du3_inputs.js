module.exports =
{
	props: ['inputs'],

	/*
    id - Номер трубки (проставляется на трубке), должен быть уникальным;
    MM, l - масса и длина заготовки (для расчёта условного внутреннего диаметра d), г, мм;
    L, R, С - углы правый, левый и центральный, град;
    A - расстояние от оси гиба до плоскости симметрии, мм;
    RL, RR - радиусы левый и правый, мм;
    d - внутренний диаметр трубки, мм, до сотых.
    */

  	template:
  	   `<div class="addTube modal fade" tabindex="-1" role="dialog" aria-labelledby="Добавление трубки" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
				<div class="input-group input-group-sm">
					<div class="input-group-addon">
						<div class="form-inline input-group input-group-sm">
							<div class="input-group-prepend">
								<span class="input-group-text">№ трубки</span>
							</div>
							<input class="form-control" v-model.lazy="inputs._id" type="text">
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-prepend">
								<span class="input-group-text">Масса заготовки</span>
							</div>
							<input class="form-control" v-model.lazy="inputs.MM" type="text">
							<div class="input-group-append">
								<span class="input-group-text">г</span>
							</div>
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-prepend">
								<span class="input-group-text">Длина заготовки</span>
							</div>
							<input class="form-control" v-model.lazy="inputs.l" type="text">
							<div class="input-group-append">
								<span class="input-group-text">мм</span>
							</div>
						</div>
					</div>
				</div>

				<div class="input-group input-group-sm">

					<div>Измерения
						<div v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="'dim'+i" class="form-inline input-group input-group-sm">
							<div class="input-group-prepend">
								<span class="input-group-text">
									Измерение {{i}}
								</span>	
							</div>
							<input class="form-control" v-model.lazy="inputs['dim' + i]" type="text">
							<div class="input-group-append">
								<span class="input-group-text">
									мм
								</span>
							</div>
						</div>
					</div>
				</div>

				<div class="btn-toolbar__addTube btn-toolbar justify-content-between">
					<button class="btn btn-outline-success btn-sm" v-on:click="$emit('add')">
						<img class="octicon" src="./node_modules/octicons/build/svg/check.svg" alt="Добавить трубку"> Добавить трубку
					</button>
					<button class="btn btn-outline-secondary  btn-sm" data-dismiss="modal">
						<img class="octicon" src="./node_modules/octicons/build/svg/x.svg" alt="Отмена"> Отмена
					</button>
				</div>
		    </div>
		  </div>
		</div>`
}