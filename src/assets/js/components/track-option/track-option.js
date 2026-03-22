import { HTML_TEMPLATE } from "./track-option-template.js";
import { withBaseUrl } from "../../lib/base-url.js";

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
      this.bpm,
      this.id,
      this.src,
      this.img
    );

    this.addEventListener('click', (event) => {
      // only trigger redirection if we're in list view
      const isListView = this.parentElement?.classList.contains('list-view');
      if (isListView) {
        window.location.href = withBaseUrl(`track-info/${this.id}/`);
      }
    });

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

  get id(){
    return this.getAttribute('track-id') || "";
  }

  get src(){
    return this.getAttribute('track-src') || "";
  }

  get img(){
    return this.getAttribute('track-img') || "";
  }

  static get observedAttributes(){
    return [
      'track-title',
      'track-description',
      'track-duration',
      'track-genre',
      'track-date',
      'track-bpm',
      'track-id',
      'track-src',
      'track-img'
    ];
  }
}