import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

function loadCSS(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

loadCSS("https://fonts.googleapis.com/css?family=Gloria+Hallelujah");

class SkodaCard extends LitElement {
  constructor() {
    super();
    this.imageurl = "";
    this.config = {};
  }

  static get styles() {
    return style;
  }

  set hass(hass) {
    this._hass = hass;
    let updated = false;
  }

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
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
    this.imageurl = 'https://ip-modcwp.azureedge.net//modcwp3v5b20200903/0F0F-2ovtqWUlebk-6kVu2o9bdY-17NgmyXQTv.qVlH-yIC8G.6aPQ2EXMUzv-s1BZqeSWgmRyK69.kcuHUNDxO-DiSFcTLXOgdPZlAGIn-1080570studiovbeauty_connectview101281.png?v=637169955100000000';
  }

  render(){
    return html`
      <ha-card>
        ${this.renderContainer()}
      </ha-card>
    `;
  }

  renderContainer() {
    return html `
      <div class="skoda-container">
        ${this.renderBackground()} ${this.renderHeader()} ${this.renderStates()}
      </div>
    `
  }

  renderHeader() {
    return html `
      ${this.config.title == null || this.config.title == true
      ? html`
        <div class="skoda-header">
          <div class="name">
            ${this.header}
          </div>
        </div>`
      : "" }
    `;
  }

  renderBackground() {
    return html `
      <img class="skoda-model" src="${this.imageurl}">
    `
  }

  renderStates() {
    return html `
      <div class="skoda-footer">
      ${this.config.entities.map(ent => {
        const stateObj = this._hass.states[ent];
        console.log(stateObj);
        return stateObj
          ? html`
              <div class="skoda-state">
                //${this.config.headers == true ? html `<div class="skoda-state-label">${stateObj}</div>` : "" }
                <div class="skoda-state-icon">
                  <ha-icon class="skoda-icon" .icon=${this.getIcon(stateObj)}></ha-icon>
                </div>
                <div class="skoda-state-state">${stateObj.state}</div>
              </div>
            `
          : html`
              <div class="not-found">Entity ${ent} not found.</div>
            `;
      })}
      </div>
    `
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }

  getIcon(entity) {
    return (
      this.config.icon || entity.attributes.icon
    );
  }

  static get styles() {
    return css`
      .skoda-container {
        position: relative;
      }

      .skoda-model {
        display: block;
        max-width: 100%;
        padding-top: 30px;
        padding-bottom: 20px;
      }

      .skoda-header {
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 10px;
        text-align: center;
        font-size: 24px;
      }

      .skoda-state {
        height: 100%;
        width: 50px;
        margin: 0px 5px;
        padding-bottom: 10px;
      }

      .skoda-state-icon {
        max-width: 100%;
        margin: 0px;
        padding: 0px;
      }

      ha-icon.skoda-icon {
        --mdc-icon-size: 100%;
      }

      p.skoda-state-state {
        margin: 5px 0px;
        padding: 0px;
      }

      .skoda-footer {
        position: absolute;
        bottom: 0px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: space-evenly;
        width: 100%;
        height: 80px;
        background-color: rgba(0,0,0,0.7);
      }
    `;
  }
}

customElements.define('skoda-card', SkodaCard);
