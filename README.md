# Skoda Connect card
Home Assistant Lovelace UI card for Skoda Connect integration

This card creates a pretty (up for discussion) card for your Skoda car status.

## Configuration

### General

| Name | Type | Required | Default | Description
| ---- | ---- | -------- | ------- | -----------
| type | string | True | - | Must be "custom:blind-card"
| title | string | False | - | Title of the card

### Device
| Name | Type | Required | Default | Description
| ---- | ---- | -------- | ------- | -----------
| device | string | True | - | The name of the device

Choose the device corresponding to the vehicle you want to display.
The card assumes that the default sensor names are used and might not work if the entities have been renamed.

### Sample

```yaml
type: 'custom:skoda-card'
title: My car
device: superb
```
