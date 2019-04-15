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
	  		<th> {{ pair.id1 }} </th>
			<th> {{ pair.id2 }} </th>
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
							    <table class="main-table table-sm table-responsive table-striped table-bordered table-hover">
									<thead class="thead-inverse">
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
									        <td> {{ pair.tube1.Freq | fix(2) }} </td>
									        <td> {{ pair.tube2.Freq | fix(2) }} </td>
									        <td class="bg-success"> {{ pair.Freq       | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Чувствительность, мм</th>
									        <td> {{ pair.tube1.Def  | fix(5) }} </td>
									        <td> {{ pair.tube2.Def  | fix(5) }} </td>
									        <td class="bg-success"> {{ pair.Def        | fix(5) }} </td>
									    </tr>

									    <tr>
									        <th>Масса воды, г</th>
									        <td> {{ pair.tube1.m    | fix(2) }} </td>
									        <td> {{ pair.tube2.m    | fix(2) }} </td>
									        <td class="bg-success"> {{ pair.m          | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Масса заготовки, г</th>
									      	<td> {{ pair.tube1.MM   | fix(2) }} </td>
									      	<td> {{ pair.tube2.MM   | fix(2) }} </td>
									      	<td> {{ pair.MM         | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Длина заготовки, мм</th>
									      	<td> {{ pair.tube1.l    | fix(2) }} </td>
									      	<td> {{ pair.tube2.l    | fix(2) }} </td>
									      	<td> {{ pair.l          | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Изм. 1, мм</th>
											<td> {{ pair.tube1.dim1 | fix(2) }} </td>
											<td> {{ pair.tube2.dim1 | fix(2) }} </td>
											<td> {{ pair.dim1       | fix(2) }} </td>
									    </tr>

									    <tr>
									      	<th>Изм. 2, мм</th>
											<td> {{ pair.tube1.dim2 | fix(2) }} </td>
											<td> {{ pair.tube2.dim2 | fix(2) }} </td>
											<td> {{ pair.dim2       | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Изм. 3, мм</th>
									        <td> {{ pair.tube1.dim3 | fix(2) }} </td>
									        <td> {{ pair.tube2.dim3 | fix(2) }} </td>
									        <td> {{ pair.dim3       | fix(2) }} </td>
									    </tr> 

									    <tr>
									        <th>Изм. 4, мм</th>
									        <td> {{ pair.tube1.dim4 | fix(2) }} </td>
									        <td> {{ pair.tube2.dim4 | fix(2) }} </td>
									        <td> {{ pair.dim4       | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Масса готовой трубки, г</th>
									        <td> {{ pair.tube1.M    | fix(2) }} </td>
									        <td> {{ pair.tube2.M    | fix(2) }} </td>
									        <td> {{ pair.M          | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Левый угол, &deg;</th>
									        <td> {{ pair.tube1.L    | fix(2) }} </td>
									        <td> {{ pair.tube2.L    | fix(2) }} </td>
									        <td> {{ pair.L          | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Правый угол, &deg;</th>
									        <td> {{ pair.tube1.R    | fix(2) }} </td>
									        <td> {{ pair.tube2.R    | fix(2) }} </td>
									        <td> {{ pair.R          | fix(2) }} </td>
									    </tr>

									    <tr>
									        <th>Расстояние, мм</th>
									        <td> {{ pair.tube1.A    | fix(2) }} </td>
									        <td> {{ pair.tube2.A    | fix(2) }} </td>
									        <td> {{ pair.A          | fix(2) }} </td>
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