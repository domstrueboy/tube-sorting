module.exports =
{
	props: ['state', 'criteria', 'intersection'],

  	template:
  		`<tr>
			<th>Трубка №1</th>
			<th>Трубка №2</th>
			<th class="pointer" v-on:click="$emit('sort-table-by-criteria')" v-bind:class="{ 'bg-danger': criteria }">Критерий качества</th>
			<th class="pointer" v-on:click="$emit('sort-table-by-intersection')" v-bind:class="{ 'bg-danger': intersection }">Пересечение</th>
			<th>
			  	<p style="width:190px">
				   	<input style="width:100px" class="pointer" type="range" min="0" max="10" step="0.1" v-model="state.criteriaMax"> 
				   	<button style="margin-left:10px;margin-right:10px" class="btn btn-secondary btn-sm" v-on:click="$emit('save-criteria-max')">
				    	<img class="octicon" src="./node_modules/octicons/build/svg/check.svg" alt="Сохр.знач.">
				   	</button>
				   <span>{{ state.criteriaMax }}</span>
			  </p>
			</th>
		</tr>`
}