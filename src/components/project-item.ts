import Component from "./base-component";
// import { autobind } from "../decorators/autobind";
import { Project } from "../models/project";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>{
  private project: Project;

  constructor(hostId: string, project: Project) {
    super('single', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

      
  configure(): void {
    
  }

  renderContent(): void {
    this.element.querySelector('h3')!.textContent = this.project.title;
    this.element.querySelector('.list__description')!.textContent = this.project.description;
    this.element.querySelector('.list__team')!.textContent = this.project.team;
  }

}