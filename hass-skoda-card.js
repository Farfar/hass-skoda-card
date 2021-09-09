import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class SkodaCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      imageurl: { type: String }
    };
  }

  render(){
    return html`
      <skoda-card>
        <div id="container">
          <p>${this.config.entities}</p>
          <img id="skoda-model" src="${this.imageurl}" style="display:block">
        </div>
        </skoda-card>
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
}

customElements.define('skoda-card', SkodaCard);
