module.exports =
{
	props: ['pair'],

	filters:
	{
	  	fix: function(value, sign)
	  	{
	  		return value.toFixed(sign);
	  	}
	 },

  	template:
	  	`<tr>
	  		<td><b> {{ pair.id1 }} </b></td>
			<td><b> {{ pair.id2 }} </b></td>
			<td> {{ pair.criteria | fix(3) }} </td>
			<td> {{ pair.intersection }} </td>
			<td>
				<button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" :data-target="'#pairInfo-'+pair._id">
					<img class="octicon" src="./node_modules/octicons/build/svg/info.svg">
				</button>

				<!-- Модальное окно, отображающее информацию о трубке -->
				<div :id="'pairInfo-'+pair._id" class="modal fade" tabindex="-1" role="dialog" :aria-labelledby="'Информация о паре №'+pair._id" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
							    <h6 class="modal-title">Пара № <strong>{{ pair._id }}</strong>,<br>
							    	Критерий качества = <strong>{{ pair.criteria | fix(3)}}</strong>
							    </h6>
							</div>
							<div class="modal-body">
							    <table class="table table-sm table-responsive table-striped table-bordered table-hover">
									<thead class="thead-dark">
									    <tr>
									        <th>№ трубки:</th>
									        <th> {{ pair.tube1._id }} </th>
									        <th> {{ pair.tube2._id }} </th>
									        <th> В паре </th>
									    </tr>
									</thead>

									<tbody>
									    <tr>
									        <th>Частота, Гц</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].Freq | fix(2) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].Freq | fix(2) }} </td>
									        <td class="bg-success"> {{ pair.Freq       | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Чувствительность, мм</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].Def  | fix(5) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].Def  | fix(5) }} </td>
									        <td class="bg-success"> {{ pair.Def        | fix(5) }} </td>
									    </tr>

									    <tr>
									        <th>Масса воды, г</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].m    | fix(2) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].m    | fix(2) }} </td>
									        <td class="bg-success"> {{ pair.m          | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Масса заготовки, г</th>
									      	<td> {{ pair.tube1.params[pair.tube1.selected].MM   | fix(2) }} </td>
									      	<td> {{ pair.tube2.params[pair.tube2.selected].MM   | fix(2) }} </td>
									      	<td> {{ pair.MM         | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Длина заготовки, мм</th>
									      	<td> {{ pair.tube1.params[pair.tube1.selected].l    | fix(2) }} </td>
									      	<td> {{ pair.tube2.params[pair.tube2.selected].l    | fix(2) }} </td>
									      	<td> {{ pair.l          | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Угол левый, &deg;</th>
											<td> {{ pair.tube1.params[pair.tube1.selected].L | fix(2) }} </td>
											<td> {{ pair.tube2.params[pair.tube2.selected].L | fix(2) }} </td>
											<td> {{ pair.L       | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Угол правый, &deg;</th>
											<td> {{ pair.tube1.params[pair.tube1.selected].R | fix(2) }} </td>
											<td> {{ pair.tube2.params[pair.tube2.selected].R | fix(2) }} </td>
											<td> {{ pair.R       | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Угол центральный, &deg;</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].C | fix(2) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].C | fix(2) }} </td>
									        <td> {{ pair.C       | fix(2) }} </td>
									    </tr> 

									    <tr>
									        <th>Расстояние от оси гиба до плоскости симметрии, мм</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].A | fix(2) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].A | fix(2) }} </td>
									        <td> {{ pair.A       | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Радиус левый, мм</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].RL    | fix(2) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].RL    | fix(2) }} </td>
									        <td> {{ pair.RL          | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Радиус правый, мм</th>
									        <td> {{ pair.tube1.params[pair.tube1.selected].RR    | fix(2) }} </td>
									        <td> {{ pair.tube2.params[pair.tube2.selected].RR    | fix(2) }} </td>
									        <td> {{ pair.RR          | fix(2) }} </td>
									    </tr>
		        
									</tbody>    
								</table>
							</div>
							<div class="modal-footer">
								<button class="btn btn-outline-secondary  btn-sm" data-dismiss="modal">
									<img class="octicon" src="./node_modules/octicons/build/svg/x.svg" alt="Отмена"> Отмена
								</button>
							</div>
						</div>
					</div>
				</div>
			</td>
			
			<td>
				<button class="btn btn-outline-primary btn-sm" v-on:click="$emit('remove-pair')">
				    <img class="octicon" src="./node_modules/octicons/build/svg/chevron-left.svg"> Убрать пару
				</button>
			</td>

			<td>
				<button class="btn btn-outline-success btn-sm" v-on:click="$emit('add-pair-to-archieve')">
				    <img class="octicon" src="./node_modules/octicons/build/svg/file-symlink-file.svg"> Сохранить в архив
				</button>
			</td>
		</tr>`
}