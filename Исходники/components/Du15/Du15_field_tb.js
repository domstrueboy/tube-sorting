module.exports =
{
	props: ['item'],

	filters:
	{
	  	fix: function(value, sign)
	  	{
	  		return value.toFixed(sign);
	  	}
	 },

  	template:
	  	`<tr>
			<th> {{ item.id1 }} </th>
			<th> {{ item.id2 }} </th>
			<td> {{ item.criteria | fix(3) }} </td>
			<td> {{ item.intersection }} </td>

			<td>
				<button class="btn btn-outline-primary btn-sm" v-on:click="$emit('add-pair')">
					Выбрать пару <img class="octicon" src="./node_modules/octicons/build/svg/chevron-right.svg">
				</button>
			</td>
		</tr>`
}