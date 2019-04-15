module.exports =
{
	props: ['tube'],

	filters:
	{
	  	fix: function(value, sign)
	  	{
	  		return value.toFixed(sign);
	  	}
	},

	 data: function () {
	  return {
	    editFlag: false
	  }
	},

  	template:
  	   `<tr v-if="!editFlag" class="tubes">
  	   		<th> {{ tube._id }} </th>
			<td> {{ tube.MM   | fix(2) }} </td>
			<td> {{ tube.l    | fix(2) }} </td>
			<td> {{ tube.dim1 | fix(2) }} </td>
			<td> {{ tube.dim2 | fix(2) }} </td>
			<td> {{ tube.dim3 | fix(2) }} </td>
			<td> {{ tube.dim4 | fix(2) }} </td>
			<td> {{ tube.M    | fix(2) }} </td>

		    <td> {{ tube.L    | fix(2) }} </td>
		    <td> {{ tube.R    | fix(2) }} </td>
		    <td> {{ tube.A    | fix(2) }} </td>
		    <td> {{ tube.Freq | fix(2) }} </td>
		    <td> {{ tube.Def  | fix(5) }} </td>
		    <td> {{ tube.m    | fix(2) }} </td>

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
	  	   	<th> {{ tube._id }}  </th>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.MM" type="text"> </td>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.l" type="text"> </td>

			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.dim1" type="text"> </td>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.dim2" type="text"> </td>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.dim3" type="text"> </td>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.dim4" type="text"> </td>

			<td> {{ tube.M           | fix(2) }} </td>

			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.L" type="text"> </td>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.R" type="text"> </td>
			<td class="input-group-sm"> <input class="form-control" v-model.lazy="tube.A" type="text"> </td>

			<td> {{ tube.Freq        | fix(2) }} </td>
			<td> {{ tube.Def         | fix(5) }} </td>
			<td> {{ tube.m           | fix(2) }} </td>

			<td>
			    <button class="btn btn-outline-second btn-sm" v-on:click="editFlag=false">
			    	<img class="octicon" src="./node_modules/octicons/build/svg/x.svg">
			    </button>
			</td>

			<td>
			    <button class="btn btn-success btn-sm" v-on:click="editFlag=false;$emit('edit-tube')">
					<img class="octicon" src="./node_modules/octicons/build/svg/check.svg">
				</button>
			</td>
		</tr>`
}