import "https://unpkg.com/wired-card@0.8.1/wired-card.js?module";
import "https://unpkg.com/wired-toggle@0.8.0/wired-toggle.js?module";
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
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  render(){
    return html`
      <wired-card elevation="2">
          ${this.config.entities.map(ent => {
          const stateObj = this.hass.states[ent];
          return stateObj
            ? html`
                <div class="state">
                  ${stateObj.attributes.friendly_name}
                  <wired-toggle
                    .checked="${stateObj.state === "on"}"
                    @change="${ev => this._toggle(stateObj)}"
                  ></wired-toggle>
                </div>
              `
            : html`
                <div class="not-found">Entity ${ent} not found.</div>
              `;
        })}
        <img id="skoda-model" src="${this.imageurl}" style="display:block">
      </wired-card>
    `;
  }

  setConfig(config) {
    //if (!config.device) {
    //  throw new Error('Please define a device (vehicle name)');
    //}
    if (!config.entities) {
      throw new Error('Please define a list of entities');
    }
    this.config = config;
    this.imageurl = 'https://ip-modcwp.azureedge.net//modcwp3v5b20200903/0F0F-2ovtqWUlebk-6kVu2o9bdY-17NgmyXQTv.qVlH-yIC8G.6aPQ2EXMUzv-s1BZqeSWgmRyK69.kcuHUNDxO-DiSFcTLXOgdPZlAGIn-1080570studiovbeauty_connectview101281.png?v=637169955100000000';
    //${this.hass.states['device_tracker.superb_position'].attributes.entity_picture}
}

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }


  static get styles() {
    return css`
      :host {
        font-family: "Gloria Hallelujah", cursive;
      }
      wired-card {
        background-color: white;
        padding: 16px;
        display: block;
        font-size: 18px;
      }
      .state {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        align-items: center;
      }
      .not-found {
        background-color: yellow;
        font-family: sans-serif;
        font-size: 14px;
        padding: 8px;
      }
      wired-toggle {
        margin-left: 8px;
      }
    `;
  }
}

customElements.define('skoda-card', SkodaCard);
