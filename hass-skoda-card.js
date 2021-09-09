import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class SkodaCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      imageurl: ''
    };
  }

  setConfig(config) {
    if (!config.device) {
      throw new Error('Please define a device (vehicle name)');
    }
    if (!config.entities) {
      throw new Error('Please define a list of entities');
    }
    this.config = config;
  }

  render(){
    return html`
      <skoda-card>
        <div id="container">
          <img id="skoda-model" src="${this.imageurl}" style="display:block">
          ${this.config.entities.map(entity => {
          const stateObj = this.hass.states[entity];
          return stateObj
            ? html`
              <div class="state">
                ${stateObj.attributes.friendly_name}:
                ${stateObj.state}
              </div>
            `
            : html`
              <div class="not-found">Entity ${entity} not found.</div>
            `;
          })}
        </div>
        </skoda-card>
    `;
  }

  set hass(hass) {
    this.hass = hass;
    const name = this.config.device;

    if (this.config.title == null || this.config.title == true) {
      this.header = `Skoda ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    }

    const base_entity = this.config.device.toLowerCase();
    this.imageurl = this.hass.states[`device_tracker.${base_entity}_position`].attributes.entity_picture;
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }
}

customElements.define('skoda-card', SkodaCard);
