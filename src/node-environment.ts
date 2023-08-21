
import BaseEnvironment from 'jest-environment-node'
import {handler} from "./handler.js";

class CustomEnvironment extends BaseEnvironment {
  handleTestEvent = handler
}
export default CustomEnvironment
