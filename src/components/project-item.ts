import Component from "./base-component";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
  private project: Project;

  constructor(hostId: string, project: Project) {
    super('single', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_event: DragEvent): void {
    
  }
      
  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h3')!.textContent = this.project.title;
    this.element.querySelector('.list__description')!.textContent = this.project.description;
    this.element.querySelector('.list__team')!.textContent = this.project.team;
  }

}