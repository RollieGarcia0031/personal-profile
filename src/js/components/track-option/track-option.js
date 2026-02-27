import { HTML_TEMPLATE } from "./track-option-template.js";

export class TrackOption extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    this.innerHTML = HTML_TEMPLATE(
      this.title,
      this.description,
      this.duration,
      this.genre,
      this.date,
      this.bpm
    );

    this.addEventListener('click', ()=>console.log('hello'));
    console.log(this.innerHTML);
  }

  get title(){
    return this.getAttribute('track-title') || "";
  }

  get description(){
    return this.getAttribute('track-description') || "";
  }

  get duration(){
    return this.getAttribute('track-duration') || "";
  }

  get genre(){
    return this.getAttribute('track-genre') || "";
  }

  get date(){
    return this.getAttribute('track-date') || "";
  }

  get bpm(){
    return this.getAttribute('track-bpm') || "";
  }

  static get observedAttributes(){
    return [
      'track-title',
      'track-description',
      'track-duration',
      'track-genre',
      'track-date',
      'track-bpm',
    ];
  }


}