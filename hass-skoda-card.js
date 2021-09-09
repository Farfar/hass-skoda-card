class SkodaCard extends HTMLElement {
  set hass(hass) {
    const device = this.config.device;
    const tracker = 'device_tracker'.concat(device, '_position')
    const moving = 'binary_sensor'.concat(device, '_vehicle_moving')
    const tracker_state = hass.states[tracker]
    const moving_state = hass.states[moving]
    //const model_image =

    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Example-card">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector('div');
    }

    this.content.innerHTML = `
      The chosen vehicle ${device} is ${moving_state} and currently ${tracker_state}!
      <br><br>
      <img src="http://via.placeholder.com/350x150">
    `;
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define("skoda-card", SkodaCard);
