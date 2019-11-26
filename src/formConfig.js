const formConfig = {
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Name"
    },
    value: "",
    validation: {
      required: true,
      minLength: 3
    },
    valid: false,
    touched: false,
    errorText: 'Please enter valid Name'
  },
  street: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Street"
    },
    value: "",
    validation: {
      required: true,
      minLength: 3
    },
    valid: false,
    touched: false,
    errorText: 'Please enter valid Street'
  },
  zipCode: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "ZIP Code"
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5
    },
    valid: false,
    touched: false,
    errorText: 'Please enter valid zip code'
  },
  country: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Country"
    },
    value: "",
    validation: {
      required: true,
      minLength: 3
    },
    valid: false,
    touched: false,
    errorText: 'Please enter valid Country'
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Mail"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    errorText: 'Please enter valid Mail'
  },
  deliveryMethod: {
    elementType: "select",
    elementConfig: {
      options: [
        { value: "fastest", displayValue: "Fastest" },
        { value: "cheapest", displayValue: "Cheapest" }
      ]
    },
    validation:{},
    value: "fastest",
    valid: true,
  }
};
export default  formConfig;