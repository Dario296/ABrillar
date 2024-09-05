import React from 'react';

const TotalForTheDay = ({ productos, hora }) => {
	return (
		<>
			{productos.map((item) => (
				<tr key={item.ID}>
					<td>{item.nombre}</td>
					<td>{item.cantidad}</td>
					<td>{item.precio}</td>
					<td>{hora || ''}</td>
				</tr>
			))}
		</>
	);
};

export default TotalForTheDay;
