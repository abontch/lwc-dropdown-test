import { api, track, LightningElement } from "lwc";

export default class App extends LightningElement {

  @api label = 'Test';
  @api placeholder = '';
  @api value = '';
  @api options = [
    { label : "Test1",
      value: "Test1"
    }, 
    {
      label : "Test2",
      value: "Test2"
    }, 
    {
      label : "Text1",
      value: "Text1"
    }
  ];

  @track isFocussed = false;

  filteredOptions = [];

  connectedCallback() {
      this.filteredOptions = [...this.options];
  }

  get isOptionsAvailable() {
      return this.filteredOptions.length > 0;
  }

  get dropdownClasses() {
      
      let dropdownClasses = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
      
      // Show dropdown list on focus
      if (this.isFocussed) {
          dropdownClasses += ' slds-is-open';
      }

      return dropdownClasses;
  }

  handleInput(event) {
      const inputValue = event.target.value;
      this.value = inputValue;
      console.log("filterText", inputValue);
      this.filteredOptions = this.options.filter(option => {
          return option.label.toLowerCase().includes(inputValue.toLowerCase());
      });
  }

  handleSelectOption(event) {
      this.value = event.currentTarget.dataset.label;
      const custEvent = new CustomEvent(
          'selectoption', {
              detail: {
                  value: event.currentTarget.dataset.value,
                  label: event.currentTarget.dataset.label
              }
          }
      );
      console.log("custEvent", custEvent.detail);
      this.dispatchEvent(custEvent);

      // Close the picklist options
      this.isFocussed = false;
  }

  handleFocus() {
      this.isFocussed = true;
  }

  handleBlur() {
      // Timeout to ensure click event is captured before the 
      // options are hidden
      setTimeout(() => { this.isFocussed = false; }, 500);
  }
}
