import { Link } from 'react-router-dom';
import whatsappIcon from './floating-whatsapp.png';

const WhatsappButton = () => {
	return (
		<Link to='https://api.whatsapp.com/send?phone=+543516062623&text=Hola%20vengo%20del%20sitio%20web%20quiero%20consultarles:%20' target='_blank' className='ImgWpsContainer'>
			<img className='img-wps' src={whatsappIcon} alt='whatsapp icon' />
		</Link>
	);
};

export default WhatsappButton;
