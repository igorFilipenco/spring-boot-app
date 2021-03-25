//service params
import {
	NOT_BLANK,
	VALID_MAIL,
	VALID_PASSWORD
}                   from "../constants/constants";


class FormValidationService {
	static validate(fieldName, value, type) {
		switch (type) {
			case NOT_BLANK:
				if (value.length === 0) {
					return {[fieldName]: `${fieldName} should not be blank`}
				}
				break;
			case VALID_MAIL:
				if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
				{
					return {[fieldName]: `Incorrect e-mail address format`}
				}
				break;
			case VALID_PASSWORD:
				if (value.length < 6) {
					return {[fieldName]: `${fieldName} must contain minimum 6 symbols`}
				}
				break;
		}
	}
}

export default FormValidationService;
