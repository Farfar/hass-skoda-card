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
        <ha-card header="Skoda Connect">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector('div');
    }

    this.content.innerHTML = `
      The chosen vehicle ${device}, device tracker sensor is ${tracker} and moving sensor is ${moving}!
      <br><br>
      <img src="http://via.placeholder.com/350x150">
    `;
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig(config) {
    if (!config.device) {
      throw new Error('You need to define a device name!');
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
