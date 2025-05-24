// src/api.js
import axios from "axios";

const OPENAI_API_KEY = "OPANAI_API_KEY"; 
const YOUR_TEMPLATE = {
    "version": 1,
    "minor_version": 1,
    "key": "lovelace.3_scenariji_in_dogodki",
    "data": {
      "config": {
        "views": [
          {
            "title": "Home",
            "cards": [
              {
                "type": "entities",
                "title": "Simulate Presence (Zones)",
                "entities": [
                  {
                    "entity": "input_boolean.fake_light_one_presence",
                    "name": "Presence: Light One"
                  },
                  {
                    "entity": "input_boolean.fake_light_two_presence",
                    "name": "Presence: Light Two"
                  },
                  {
                    "entity": "input_boolean.fake_light_three_presence",
                    "name": "Presence: Light Three"
                  },
                  {
                    "entity": "input_boolean.fake_light_four_presence",
                    "name": "Presence: Light Four"
                  },
                  {
                    "entity": "input_boolean.fake_light_five_presence",
                    "name": "Presence: Light Five"
                  }
                ]
              },
              {
                "type": "entities",
                "entities": [
                  {
                    "entity": "input_number.fake_co2_sensor",
                    "name": "Set CO₂ Level"
                  },
                  {
                    "entity": "sensor.co2_level",
                    "name": "CO₂ Level (ppm)"
                  }
                ]
              },
              {
                "type": "entity",
                "entity": "sensor.co2_level",
                "name": "CO₂ Level"
              },
              {
                "type": "light",
                "entity": "light.signal_light",
                "name": "Air Quality Signal Light"
              },
              {
                "type": "custom:mushroom-template-card",
                "primary": "Selected Lights",
                "secondary": "{{ states('sensor.selected_lights') }}",
                "icon": "mdi:lightbulb-group-outline",
                "icon_color": "{% if states('sensor.selected_lights') != 'None selected' %}amber{% else %}grey{% endif %}",
                "fill_container": true,
                "card_mod": {
                  "style": "ha-card { margin-bottom: 10px; border-radius: 12px; background-color: rgba(255, 193, 7, 0.1); } .primary { font-size: 1.1rem; font-weight: bold; } .secondary { font-size: 0.9rem; text-align: center; }"
                }
              }
            ]
          },
          {
            "title": "Event Modes",
            "icon": "mdi:party-popper",
            "cards": [
              {
                "type": "custom:mushroom-title-card",
                "title": "Izberite Luči",
                "subtitle": "Izberite luči, ki jih želite upravljati",
                "icon": "mdi:lightbulb-multiple",
                "card_mod": {
                  "style": ".title { font-size: 18px; } .subtitle { opacity: 0.8; }"
                }
              },
              {
                "type": "horizontal-stack",
                "cards": [
                  {
                    "type": "custom:mushroom-template-card",
                    "primary": "Izberi vse",
                    "icon": "mdi:checkbox-multiple-marked",
                    "icon_color": "{% if is_state('input_boolean.select_light_one', 'on') and is_state('input_boolean.select_light_two', 'on') and is_state('input_boolean.select_light_three', 'on') and is_state('input_boolean.select_light_four', 'on') and is_state('input_boolean.select_light_five', 'on') and is_state('input_boolean.select_light_six', 'on') and is_state('input_boolean.select_light_seven', 'on') and is_state('input_boolean.select_light_eight', 'on') and is_state('input_boolean.select_light_nine', 'on') %}blue{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "call-service",
                      "service": "script.select_all_lights"
                    },
                    "card_mod": {
                      "style": "ha-card { cursor: pointer; margin: 0 4px; border-radius: 12px; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,150,255,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "primary": "Odznači vse",
                    "icon": "mdi:checkbox-multiple-blank-outline",
                    "icon_color": "{% if is_state('input_boolean.select_light_one', 'off') and is_state('input_boolean.select_light_two', 'off') and is_state('input_boolean.select_light_three', 'off') and is_state('input_boolean.select_light_four', 'off') and is_state('input_boolean.select_light_five', 'off') and is_state('input_boolean.select_light_six', 'off') and is_state('input_boolean.select_light_seven', 'off') and is_state('input_boolean.select_light_eight', 'off') and is_state('input_boolean.select_light_nine', 'off') %}blue{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "call-service",
                      "service": "script.deselect_all_lights"
                    },
                    "card_mod": {
                      "style": "ha-card { cursor: pointer; margin: 0 4px; border-radius: 12px; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                    }
                  }
                ]
              },
              {
                "type": "horizontal-stack",
                "cards": [
                  {
                    "type": "vertical-stack",
                    "cards": [
                      {
                        "type": "custom:mushroom-title-card",
                        "title": "Leva Sekcija",
                        "icon": "mdi:sofa",
                        "icon_color": "blue",
                        "card_mod": {
                          "style": ".title { font-size: 16px; }"
                        }
                      },
                      {
                        "type": "grid",
                        "columns": 2,
                        "square": true,
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Sekundarna Jedilnica",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_one', 'on') %}blue{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_one', 'on') %}rgba(0, 140, 255, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_one', 'on') %}0 0 10px 0px rgba(0, 140, 255, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_one', 'on') %}rgba(0, 140, 255, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_one"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza L1",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_two', 'on') %}blue{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_two', 'on') %}rgba(0, 140, 255, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_two', 'on') %}0 0 10px 0px rgba(0, 140, 255, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_two', 'on') %}rgba(0, 140, 255, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_two"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza L2",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_three', 'on') %}blue{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_three', 'on') %}rgba(0, 140, 255, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_three', 'on') %}0 0 10px 0px rgba(0, 140, 255, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_three', 'on') %}rgba(0, 140, 255, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_three"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza L3",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_four', 'on') %}blue{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_four', 'on') %}rgba(0, 140, 255, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_four', 'on') %}0 0 10px 0px rgba(0, 140, 255, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_four', 'on') %}rgba(0, 140, 255, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_four"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza L4",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_five', 'on') %}blue{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_five', 'on') %}rgba(0, 140, 255, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_five', 'on') %}0 0 10px 0px rgba(0, 140, 255, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_five', 'on') %}rgba(0, 140, 255, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_five"
                              }
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "vertical-stack",
                    "cards": [
                      {
                        "type": "custom:mushroom-title-card",
                        "title": "Desna Sekcija",
                        "icon": "mdi:table-chair",
                        "icon_color": "amber",
                        "card_mod": {
                          "style": ".title { font-size: 16px; }"
                        }
                      },
                      {
                        "type": "grid",
                        "columns": 2,
                        "square": true,
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Primarna Jedilnica",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_six', 'on') %}amber{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_six', 'on') %}rgba(255, 170, 0, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_six', 'on') %}0 0 10px 0px rgba(255, 170, 0, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_six', 'on') %}rgba(255, 170, 0, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_six"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza D1",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_seven', 'on') %}amber{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_seven', 'on') %}rgba(255, 170, 0, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_seven', 'on') %}0 0 10px 0px rgba(255, 170, 0, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_seven', 'on') %}rgba(255, 170, 0, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_seven"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza D2",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_eight', 'on') %}amber{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_eight', 'on') %}rgba(255, 170, 0, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_eight', 'on') %}0 0 10px 0px rgba(255, 170, 0, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_eight', 'on') %}rgba(255, 170, 0, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_eight"
                              }
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Miza D3",
                            "icon": "mdi:ceiling-light",
                            "icon_color": "{% if is_state('input_boolean.select_light_nine', 'on') %}amber{% else %}grey{% endif %}",
                            "layout": "vertical",
                            "fill_container": true,
                            "card_mod": {
                              "style": "ha-card { height: 80px; cursor: pointer; border-radius: 12px; border: 1px solid {% if is_state('input_boolean.select_light_nine', 'on') %}rgba(255, 170, 0, 0.5){% else %}rgba(0,0,0,0.1){% endif %}; box-shadow: {% if is_state('input_boolean.select_light_nine', 'on') %}0 0 10px 0px rgba(255, 170, 0, 0.3){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.select_light_nine', 'on') %}rgba(255, 170, 0, 0.1){% else %}var(--card-background-color){% endif %}; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                            },
                            "tap_action": {
                              "action": "call-service",
                              "service": "input_boolean.toggle",
                              "service_data": {
                                "entity_id": "input_boolean.select_light_nine"
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "custom:mushroom-title-card",
                "title": "Načini Osvetlitve",
                "subtitle": "Izberite način osvetlitve za izbrane luči",
                "icon": "mdi:lightbulb-group",
                "card_mod": {
                  "style": ".title { font-size: 18px; } .subtitle { opacity: 0.8; }"
                }
              },
              {
                "type": "horizontal-stack",
                "cards": [
                  {
                    "type": "custom:mushroom-template-card",
                    "primary": "Izklopi Luči",
                    "icon": "mdi:lightbulb-off",
                    "icon_color": "grey",
                    "tap_action": {
                      "action": "call-service",
                      "service": "script.turn_off_selected_lights"
                    },
                    "card_mod": {
                      "style": "ha-card { cursor: pointer; margin: 0 4px; border-radius: 12px; } ha-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "primary": "Vklopi Luči",
                    "icon": "mdi:lightbulb-on",
                    "icon_color": "yellow",
                    "tap_action": {
                      "action": "call-service",
                      "service": "script.turn_on_selected_lights"
                    },
                    "card_mod": {
                      "style": "ha-card { cursor: pointer; margin: 0 4px; border-radius: 12px; } ha-card:hover { box-shadow: 0 4px 8px rgba(255,220,0,0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                    }
                  }
                ]
              },
              {
                "square": false,
                "type": "grid",
                "columns": 3,
                "cards": [
                  {
                    "type": "vertical-stack",
                    "cards": [
                      {
                        "type": "custom:mushroom-template-card",
                        "primary": "Poročni Način",
                        "secondary": "Romantična topla svetloba",
                        "icon": "mdi:heart-multiple",
                        "icon_color": "{% if is_state('input_boolean.active_wedding_mode', 'on') %}pink{% else %}grey{% endif %}",
                        "layout": "vertical",
                        "fill_container": true,
                        "card_mod": {
                          "style": "ha-card { height: 120px; cursor: pointer; border-radius: 12px; box-shadow: {% if is_state('input_boolean.active_wedding_mode', 'on') %}0 0 15px 5px rgba(255, 64, 129, 0.4){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.active_wedding_mode', 'on') %}rgba(255, 64, 129, 0.1){% else %}var(--card-background-color){% endif %}; } .primary { font-size: 1.1rem; font-weight: bold; } .secondary { font-size: 0.85rem; text-align: center; } ha-card:hover { box-shadow: 0 0 15px 5px rgba(255, 64, 129, 0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                        },
                        "tap_action": {
                          "action": "call-service",
                          "service": "script.apply_wedding_mode_to_selected"
                        }
                      }
                    ]
                  },
                  {
                    "type": "vertical-stack",
                    "cards": [
                      {
                        "type": "custom:mushroom-template-card",
                        "primary": "Rojstnodnevna Zabava",
                        "secondary": "Praznična barvna osvetlitev",
                        "icon": "mdi:cake-variant",
                        "icon_color": "{% if is_state('input_boolean.active_birthday_party_mode', 'on') %}purple{% else %}grey{% endif %}",
                        "layout": "vertical",
                        "fill_container": true,
                        "card_mod": {
                          "style": "ha-card { height: 120px; cursor: pointer; border-radius: 12px; box-shadow: {% if is_state('input_boolean.active_birthday_party_mode', 'on') %}0 0 15px 5px rgba(156, 39, 176, 0.4){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.active_birthday_party_mode', 'on') %}rgba(156, 39, 176, 0.1){% else %}var(--card-background-color){% endif %}; } .primary { font-size: 1.1rem; font-weight: bold; } .secondary { font-size: 0.85rem; text-align: center; } ha-card:hover { box-shadow: 0 0 15px 5px rgba(156, 39, 176, 0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                        },
                        "tap_action": {
                          "action": "call-service",
                          "service": "script.apply_birthday_party_to_selected"
                        }
                      }
                    ]
                  },
                  {
                    "type": "vertical-stack",
                    "cards": [
                      {
                        "type": "custom:mushroom-template-card",
                        "primary": "Team Building",
                        "secondary": "Svetla, energična osvetlitev",
                        "icon": "mdi:account-group",
                        "icon_color": "{% if is_state('input_boolean.active_team_building_mode', 'on') %}blue{% else %}grey{% endif %}",
                        "layout": "vertical",
                        "fill_container": true,
                        "card_mod": {
                          "style": "ha-card { height: 120px; cursor: pointer; border-radius: 12px; box-shadow: {% if is_state('input_boolean.active_team_building_mode', 'on') %}0 0 15px 5px rgba(33, 150, 243, 0.4){% else %}none{% endif %}; background-color: {% if is_state('input_boolean.active_team_building_mode', 'on') %}rgba(33, 150, 243, 0.1){% else %}var(--card-background-color){% endif %}; } .primary { font-size: 1.1rem; font-weight: bold; } .secondary { font-size: 0.85rem; text-align: center; } ha-card:hover { box-shadow: 0 0 15px 5px rgba(33, 150, 243, 0.4); transform: translateY(-2px); transition: all 0.2s ease; }"
                        },
                        "tap_action": {
                          "action": "call-service",
                          "service": "script.apply_team_building_to_selected"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "type": "conditional",
                "conditions": [
                  {
                    "entity": "input_boolean.is_editing_mode",
                    "state": "on"
                  }
                ],
                "card": {
                  "type": "vertical-stack",
                  "cards": [
                    {
                      "type": "custom:mushroom-title-card",
                      "title": "Urejanje načina osvetlitve",
                      "subtitle": "Prilagodite nastavitve osvetlitve",
                      "icon": "mdi:palette",
                      "card_mod": {
                        "style": ".title { font-size: 18px; } .subtitle { opacity: 0.8; }"
                      }
                    },
                    {
                      "type": "entities",
                      "entities": [
                        "input_number.edit_mode_brightness"
                      ],
                      "state_color": true
                    },
                    {
                      "type": "horizontal-stack",
                      "cards": [
                        {
                          "type": "custom:mushroom-entity-card",
                          "entity": "input_number.edit_mode_red",
                          "name": "Rdeča",
                          "icon_color": "red",
                          "fill_container": true
                        },
                        {
                          "type": "custom:mushroom-entity-card",
                          "entity": "input_number.edit_mode_green",
                          "name": "Zelena",
                          "icon_color": "green",
                          "fill_container": true
                        },
                        {
                          "type": "custom:mushroom-entity-card",
                          "entity": "input_number.edit_mode_blue",
                          "name": "Modra",
                          "icon_color": "blue",
                          "fill_container": true
                        }
                      ]
                    },
                    {
                      "type": "horizontal-stack",
                      "cards": [
                        {
                          "type": "button",
                          "name": "Uporabi",
                          "icon": "mdi:check-circle-outline",
                          "tap_action": {
                            "action": "call-service",
                            "service": "script.apply_custom_edit_to_selected"
                          },
                          "show_icon": true,
                          "show_name": true,
                          "icon_height": "30px"
                        },
                        {
                          "type": "button",
                          "name": "Shrani",
                          "icon": "mdi:content-save",
                          "tap_action": {
                            "action": "call-service",
                            "service": "script.save_current_preset"
                          },
                          "show_icon": true,
                          "show_name": true,
                          "icon_height": "30px"
                        },
                        {
                          "type": "custom:mushroom-template-card",
                          "primary": "Reset",
                          "icon": "mdi:refresh",
                          "fill_container": true,
                          "tap_action": {
                            "action": "call-service",
                            "service": "script.reset_edited_preset"
                          }
                        }
                      ]
                    }
                  ]
                }
              },
              {
                "type": "entities",
                "title": "Seznam luči in njihovi načini",
                "show_header_toggle": false,
                "state_color": true,
                "entities": [
                  {
                    "type": "section",
                    "label": "Leva Sekcija"
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_one",
                    "primary": "Sekundarna Jedilnica",
                    "secondary": "{% if is_state('light.fake_light_one', 'on') %}{% set rgb = state_attr('light.fake_light_one', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_one', 'on') %}{% set rgb = state_attr('light.fake_light_one', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_two",
                    "primary": "Miza L1",
                    "secondary": "{% if is_state('light.fake_light_two', 'on') %}{% set rgb = state_attr('light.fake_light_two', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_two', 'on') %}{% set rgb = state_attr('light.fake_light_two', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_three",
                    "primary": "Miza L2",
                    "secondary": "{% if is_state('light.fake_light_three', 'on') %}{% set rgb = state_attr('light.fake_light_three', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_three', 'on') %}{% set rgb = state_attr('light.fake_light_three', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_four",
                    "primary": "Miza L3",
                    "secondary": "{% if is_state('light.fake_light_four', 'on') %}{% set rgb = state_attr('light.fake_light_four', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_four', 'on') %}{% set rgb = state_attr('light.fake_light_four', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_five",
                    "primary": "Miza L4",
                    "secondary": "{% if is_state('light.fake_light_five', 'on') %}{% set rgb = state_attr('light.fake_light_five', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_five', 'on') %}{% set rgb = state_attr('light.fake_light_five', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "section",
                    "label": "Desna Sekcija"
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_six",
                    "primary": "Primarna Jedilnica",
                    "secondary": "{% if is_state('light.fake_light_six', 'on') %}{% set rgb = state_attr('light.fake_light_six', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_six', 'on') %}{% set rgb = state_attr('light.fake_light_six', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_seven",
                    "primary": "Miza D1",
                    "secondary": "{% if is_state('light.fake_light_seven', 'on') %}{% set rgb = state_attr('light.fake_light_seven', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_seven', 'on') %}{% set rgb = state_attr('light.fake_light_seven', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_eight",
                    "primary": "Miza D2",
                    "secondary": "{% if is_state('light.fake_light_eight', 'on') %}{% set rgb = state_attr('light.fake_light_eight', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_eight', 'on') %}{% set rgb = state_attr('light.fake_light_eight', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  },
                  {
                    "type": "custom:mushroom-template-card",
                    "entity": "light.fake_light_nine",
                    "primary": "Miza D3",
                    "secondary": "{% if is_state('light.fake_light_nine', 'on') %}{% set rgb = state_attr('light.fake_light_nine', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}Poročni Način{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}Team Building{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}Rojstnodnevna Zabava{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}Romantični Način{% else %}On{% endif %}{% else %}Off{% endif %}",
                    "icon": "mdi:ceiling-light",
                    "icon_color": "{% if is_state('light.fake_light_nine', 'on') %}{% set rgb = state_attr('light.fake_light_nine', 'rgb_color')|default([0,0,0]) %}{% if rgb[0] == 255 and rgb[1] == 150 and rgb[2] == 150 %}pink{% elif rgb[0] == 100 and rgb[1] == 150 and rgb[2] == 255 %}blue{% elif rgb[0] == 255 and rgb[1] == 50 and rgb[2] == 200 %}purple{% elif rgb[0] == 180 and rgb[1] == 80 and rgb[2] == 120 %}red{% else %}yellow{% endif %}{% else %}grey{% endif %}",
                    "tap_action": {
                      "action": "none"
                    }
                  }
                ],
                "card_mod": {
                  "style": "ha-card { border-radius: 12px; margin-top: 8px; cursor: default; }"
                }
              }
            ]
          }
        ]
      }
    }
  }

  const SYSTEM_PROMPT = `
  You are a helpful assistant for Home Assistant. Based on the user's prompt, generate a script configuration in YAML format that can be directly pasted into the scripts.yaml file.
  
  Requirements:
  - Output must be valid YAML.
  - Include Jinja2 templating inside the YAML where appropriate.
  - Follow the structure below exactly.
  - Only return raw YAML code, no explanations or markdown formatting.
  
  Example script format:
  
  apply_wedding_mode_to_selected:
    alias: "Apply Wedding Mode to Selected Lights"
    sequence:
      - service: input_boolean.turn_off
        target:
          entity_id:
            - input_boolean.active_team_building_mode
            - input_boolean.active_birthday_party_mode
      - service: input_boolean.turn_on
        target:
          entity_id: input_boolean.active_wedding_mode
      - service: light.turn_on
        data:
          entity_id: >
            {% set selected = [] %}
            {% if is_state('input_boolean.select_light_one', 'on') %}
              {% set selected = selected + ['light.fake_light_one'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_two', 'on') %}
              {% set selected = selected + ['light.fake_light_two'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_three', 'on') %}
              {% set selected = selected + ['light.fake_light_three'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_four', 'on') %}
              {% set selected = selected + ['light.fake_light_four'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_five', 'on') %}
              {% set selected = selected + ['light.fake_light_five'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_six', 'on') %}
              {% set selected = selected + ['light.fake_light_six'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_seven', 'on') %}
              {% set selected = selected + ['light.fake_light_seven'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_eight', 'on') %}
              {% set selected = selected + ['light.fake_light_eight'] %}
            {% endif %}
            {% if is_state('input_boolean.select_light_nine', 'on') %}
              {% set selected = selected + ['light.fake_light_nine'] %}
            {% endif %}
            {{ selected }}
          brightness_pct: 40
          rgb_color: [255, 150, 150]
          transition: 2
      - service: script.turn_on
        target:
          entity_id: script.update_active_lighting_mode
      - service: persistent_notification.create
        data:
          title: "Wedding Mode Applied"
          message: >
            Wedding mode has been applied to: {{ states('sensor.wedding_mode_lights') }}
  
  Use this format to generate new scenes like 'Romantic Mode', 'Birthday Mode', or anything else the user asks.
  `;
  
  

  export const generateScene = async (prompt) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const content = response.data?.choices?.[0]?.message?.content;
  
      if (!content) {
        throw new Error('Empty response from OpenAI API');
      }
  
      const cleanedContent = content
        .replace(/^```(?:yaml|yml)?\s*/i, '') 
        .replace(/```$/, '');
  
      return cleanedContent; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API responded with an error:', {
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error.message);
      }
      throw error;
    }
  };
  
  
  
