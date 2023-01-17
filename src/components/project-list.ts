import { projectState } from "../states/project-state";
import { Project, ProjectStatus } from "../models/project";
import { ProjectItem } from "./project-item";
import Component from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { autobind } from "../decorators/autobind";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  assignedProjects: Project[];

  constructor(private type: 'Active' | 'Finished') {
    super('list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault();
      const listEl = this.element.querySelector('ul');
      listEl?.classList.add('list__drop');
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'Active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl?.classList.add('list__drop');
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

     projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'Active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent(): void {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    if (this.type === 'Active') {
      this.element.querySelector('h2')?.classList.add('list__header1');
    } else {
      this.element.querySelector('h2')?.classList.add('list__header2');
    }
    this.element.querySelector('h2')!.textContent = this.type + ' ' + 'Projects';
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}
