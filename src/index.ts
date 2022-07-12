import renderDOM  from './common/utils/renderDOM';

import AuthPage from './pages/auth/auth';
import RegistrationPage from './pages/registration/registration';
import ErrorPage from './pages/error/error';
import ChatsPage from './pages/chats/chats';
import ProfilePage from './pages/profile/profile';

import './scss/index.scss';

import Button from './components/button/button';
import registerComponent from './common/utils/registrComponents'
import ExtendedInput from './components/extended-input/extended-input';
import Input from './components/input/input';



registerComponent(Button);
registerComponent(ExtendedInput);
registerComponent(Input);



document.addEventListener("DOMContentLoaded", () => {
	
	// const app = new ChatsPage();
	const app = new AuthPage();

	renderDOM(app);
});