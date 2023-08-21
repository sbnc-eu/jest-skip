
import BaseEnvironment from 'jest-environment-jsdom'
import {handler} from "./handler.js";

class CustomEnvironment extends BaseEnvironment {
  handleTestEvent = handler
}
export default CustomEnvironment
