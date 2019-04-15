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
			<td><b> {{ item.id1 }} </b></td>
			<td><b> {{ item.id2 }} </b></td>
			<td> {{ item.criteria | fix(3) }} </td>
			<td> {{ item.intersection }} </td>

			<td>
				<button class="btn btn-outline-primary btn-sm" v-on:click="$emit('add-pair')">
					Выбрать пару <img class="octicon" src="./node_modules/octicons/build/svg/chevron-right.svg">
				</button>
			</td>
		</tr>`
}