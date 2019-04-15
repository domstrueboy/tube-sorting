module.exports =
{
	props: ['state'],
	
  	template:
  		`<tr>
			<th>№ трубки</th>
			<th>Изм.№1</th>
			<th>Изм.№2</th>
			<th>Изм.№3</th>
			<th>Изм.№4</th>
			<th>Изм.№5</th>
			<th>Изм.№6</th>
			<th>Изм.№7</th>
			<th>Изм.№8</th>
			<th>Изм.№9</th>
			<th>Изм.№10</th>
			<th>Изм.№11</th>
			<th>Изм.№12</th>
		    <th>Масса заготовки, г</th>
		    <th>Длина заготовки, мм</th>
		    <th>Угол левый, &deg;</th>
		    <th>Угол правый, &deg;</th>
		    <th>Угол центральный, &deg;</th>
		    <th>Межосевое расстояние/2, мм</th>
		    <th>Радиус левый, мм</th>
		    <th>Радиус правый, мм</th>
		    <th>Масса удельная, г</th>

		    <th>Частота, Гц</th>
		    <th>Чувств-ть, мм</th>
			<th>Масса воды, г</th>
			<th colspan="2"><input id="sort" :value="state.sort" @keyup.enter="$emit('save-sort')" type="text" style="width:100%"></th>
		</tr>`
}