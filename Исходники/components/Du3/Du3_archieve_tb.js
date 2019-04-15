module.exports =
{
	props: ['arch_pair'],

	filters:
	{
	  	fix: function(value, sign)
	  	{
	  		return value.toFixed(sign);
	  	}
	 },

  	template:
  	   `<tr>
			<th> {{ arch_pair.id1 }} </th>
			<th> {{ arch_pair.id2 }} </th>
			<td> {{ arch_pair.criteria | fix(3) }} </td>
			<td> {{ arch_pair.intersection }} </td>
			<th> {{ arch_pair.tube1._id }}</th>
			<th> {{ arch_pair.tube2._id }}</th>

			<td>
				<button class="btn btn-outline-warning btn-sm" v-on:click="$emit('return')">
				    <img class="octicon" src="./node_modules/octicons/build/svg/reply.svg"> Вернуть из архива
				</button>
			</td>
		</tr>`
}