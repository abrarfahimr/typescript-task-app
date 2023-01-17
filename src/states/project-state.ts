import { Project, ProjectStatus } from "../models/project";


//State Management
type Listerner<T> = (items: T[]) => void;

class State<T>{
  protected listeners: Listerner<T>[] = [];

  addListener(listenerFn: Listerner<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project>{
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState;
    return this.instance;
  }

  addProject(title: string, description: string, teams: string) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      teams,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
    }
  }

}

export const projectState = ProjectState.getInstance();