module.exports =
{
	props: ['state', 'inputs', 'tube'],

	filters:
	{
	  	fix: function(value, sign)
	  	{
			if (typeof value === "number") {
				return value.toFixed(sign);
			}
			else {
				return (value + '' === 'undefined') ? '-' : value + '';
			}
	  	}
	},

	data: function () {
	  return {
		editFlag: false,
		selected: this.tube.selected,
		field: (function(context) {
			makeField = require('./../../modules/' + context.state.sensor + '/' + context.state.sensor + '_makeField');
			let tubes = [];
			for (let i = 0, len = context.tube.params.length; i < len; i++) {
				tubes.push({
					_id: i+1,
					params: [ context.tube.params[i] ],
					selected: 0,
					pair: ''
				});
			}
			return makeField (context.state.sensor, 1000/*this.state.criteriaMax*/, "byCriteria"/*this.state.sortField*/, tubes).sort( function(a, b){ return a.criteria - b.criteria; } );
		})(this)
	  }
	},

  	template:

  	   `<tr v-if="!editFlag" class="tubes" :class="{ 'table-danger': ((tube.params.length > 1) && field.every( function(element) {return element.criteria > state.maxCriteriaForMeasurements})) }">
			<td><b> {{ tube._id }} </b></td>

			<td> {{ tube.params[tube.selected].dim1        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim2        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim3        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim4        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim5        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim6        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim7        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim8        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim9        | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim10       | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim11       | fix(1) }} </td>
			<td> {{ tube.params[tube.selected].dim12       | fix(1) }} </td>

			<td> {{ tube.params[tube.selected].MM          | fix(3) }} </td>
			<td> {{ tube.params[tube.selected].l           | fix(2) }} </td>

			<td> {{ tube.params[tube.selected].L           | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].R           | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].C           | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].A           | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].RL          | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].RR          | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].M           | fix(2) }} </td>

			<td> {{ tube.params[tube.selected].Freq        | fix(2) }} </td>
			<td> {{ tube.params[tube.selected].Def * 1000  | fix(5) }} </td>
			<td> {{ tube.params[tube.selected].m * 1000    | fix(3) }} </td>

			<td>
			    <button class="btn btn-outline-warning btn-sm" v-on:click="editFlag=true">
			    	<img class="octicon" src="./node_modules/octicons/build/svg/pencil.svg">
			    </button>
			</td>

			<td>
			    <button class="btn btn-outline-danger btn-sm" v-on:click="$emit('remove-tube')">
			    	<img class="octicon" src="./node_modules/octicons/build/svg/trashcan.svg">
			    </button>
			</td>
		</tr>

		<tr v-else class="tubes">
			<td colspan="27">
				<b>{{ tube._id }}</b>
				<table class="table-for-edit-tube table table-sm table-striped table-bordered">
					<thead class="thead thead-dark">
						<tr>
							<th>№пп</th>
							<th>Выб</th>

							<th>Изм.1</th>
							<th>Изм.2</th>
							<th>Изм.3</th>
							<th>Изм.4</th>
							<th>Изм.5</th>
							<th>Изм.6</th>
							<th>Изм.7</th>
							<th>Изм.8</th>
							<th>Изм.9</th>
							<th>Изм.10</th>
							<th>Изм.11</th>
							<th>Изм.12</th>

							<th>MM</th>
							<th>l</th>
							<th>L</th>
							<th>R</th>
							<th>C</th>
							<th>A</th>
							<th>RL</th>
							<th>RR</th>
							<th>Масса_удельная</th>
							<th>Частота</th>
							<th>Чувствительность</th>
							<th>Масса_воды</th>
							<th>Время_последнего_изменения</th>
							<th></th>
						</tr>
					</thead>
					<tbody class="tbody">
						<tr v-for="(param, index) in tube.params" :class="{ 'table-info': tube.selected === index }">
							<td> <label :for="'select-measurement'+index">{{ index + 1 }}</label> </td>
							<td> <input :id="'select-measurement'+index" v-model.lazy="selected" :value="index" :checked="tube.selected === index" name="select-measurement" type="radio"></td>
							
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim1" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim2" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim3" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim4" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim5" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim6" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim7" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim8" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim9" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim10" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim11" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.dim12" type="text"> </td>
							
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.MM" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="param.l" type="text"> </td>
							
							<td> {{ param.L           | fix(2) }} </td>
							<td> {{ param.R           | fix(2) }} </td>
							<td> {{ param.C           | fix(2) }} </td>
							<td> {{ param.A           | fix(2) }} </td>
							<td> {{ param.RL          | fix(2) }} </td>
							<td> {{ param.RR          | fix(2) }} </td>
							
							<td> {{ param.M           | fix(2) }} </td>
							
							<td> {{ param.Freq        | fix(2) }} </td>
							<td> {{ param.Def * 1000  | fix(5) }} </td>
							<td> {{ param.m * 1000    | fix(3) }} </td>
							<td> {{ param.editTime.text }} </td>
							<td>
								<button class="btn btn-outline-danger btn-sm" v-on:click="$emit('remove-measurement', {id: tube._id, num: index})">
									<img class="octicon" src="./node_modules/octicons/build/svg/trashcan.svg">
								</button>
							</td>
						</tr>
						<tr>
							<td colspan="2"></td>

							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim1" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim2" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim3" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim4" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim5" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim6" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim7" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim8" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim9" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim10" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim11" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.dim12" type="text"> </td>

							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.MM" type="text"> </td>
							<td class="input-group-sm"> <input class="form-control" v-model.lazy="inputs.l"  type="text"> </td>

							<td colspan="4">
								<button class="btn btn-secondary btn-sm" v-on:click="$emit('add-measurement')">
									<img class="octicon" src="./node_modules/octicons/build/svg/plus.svg"> Добавить измерение
								</button>
							</td>
							<td colspan="6"></td>
							<td colspan="2">
								<button class="btn btn-outline-second btn-sm" v-on:click="selected=tube.selected;editFlag=false">
									<img class="octicon" src="./node_modules/octicons/build/svg/x.svg"> Отмена
								</button>

								<button class="btn btn-success btn-sm" v-on:click="tube.selected=selected;editFlag=false;$emit('edit-tube')">
									<img class="octicon" src="./node_modules/octicons/build/svg/check.svg"> Сохранить
								</button>
							</td>
						</tr>
					</tbody>
					<thead class="thead thead-dark">
						<tr>
							<th colspan="28">Критерий качества:</th>
						</tr>
					</thead>
					<thead class="thead thead-inverse">
						<tr>
							<th>№1</th>
							<th>№2</th>
							<th>Критерий</th>
							<td colspan="25"></td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(measurement, index) in field">
							<td>{{ measurement.id1 }}</td>
							<td>{{ measurement.id2 }}</td>
							<td>{{ measurement.criteria | fix(3) }}</td>
							<td colspan="25"></td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>`
}