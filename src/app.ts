import { ProjectInput } from './components/project-input';
import '../app.css';
import { ProjectList } from './components/project-list';

new ProjectInput();
new ProjectList('Active');
new ProjectList('Finished');