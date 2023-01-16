import Component from './base-component';
import { autobind as Autobind } from '../decorators/autobind';
import * as Validation from '../utils/validation';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  teamInputElement: HTMLSelectElement;

  constructor() {
    super('project', 'app', true, 'project__form');
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLTextAreaElement;
    this.teamInputElement = this.element.querySelector('#teams') as HTMLSelectElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(){}
  
  private gatherUserInput(): [string, string, string] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredTeam = this.teamInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable)
    ) {
      alert('Invalid input, Please try again');
      return;
    } else {
       return [enteredTitle, enteredDescription, enteredTeam];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.teamInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, team] = userInput;
      console.log([title, desc, team]); // for testing
      this.clearInputs();
    }
  }
}