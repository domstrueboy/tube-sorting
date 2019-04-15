module.exports =
{
	props: ['inputs'],

  	template:
  	   `<div class="addTube modal fade" tabindex="-1" role="dialog" aria-labelledby="Добавление трубки" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
				<div class="input-group input-group-sm">
					<div class="input-group-addon">
						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon col-7">№ трубки</div>
							<input class="form-control col-5" v-model.lazy="inputs._id" type="text">
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon col-7">Масса заготовки</div>
							<input class="form-control col-3" v-model.lazy="inputs.MM" type="text">
							<div class="input-group-addon col-2">г</div>
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon col-7">Длина заготовки</div>
							<input class="form-control col-3" v-model.lazy="inputs.l" type="text">
							<div class="input-group-addon col-2">мм</div>
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon col-7">Масса готовой трубки</div>
							<input class="form-control col-3" v-model.lazy="inputs.M" type="text">
							<div class="input-group-addon col-2">г</div>
						</div>
					</div>
				</div>

				<div class="input-group input-group-sm">

					<div class="input-group-addon">Измерения
						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon">1</div>
							<input class="form-control" v-model.lazy="inputs.dim1" type="text">
							<div class="input-group-addon">мм</div>
						</div>


						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon">2</div>
							<input v-model.lazy="inputs.dim2" type="text" class="form-control">
							<div class="input-group-addon">мм</div>
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon">3</div>
							<input v-model.lazy="inputs.dim3" type="text" class="form-control">
							<div class="input-group-addon">мм</div>
						</div>

						<div class="form-inline input-group input-group-sm">
							<div class="input-group-addon">4</div>
							<input v-model.lazy="inputs.dim4" type="text" class="form-control">
							<div class="input-group-addon">мм</div>
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