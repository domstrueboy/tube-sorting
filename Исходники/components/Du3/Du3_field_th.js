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
			  	<p style="margin: 0">
				   <input id="criteriaMax" type="text" :value="state.criteriaMax" @keyup.enter="$emit('save-criteria-max')" style="width:30px">
			    </p>
			</th>
		</tr>`
}