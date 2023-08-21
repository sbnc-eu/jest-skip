
import BaseEnvironment from 'jest-environment-node'
import {handler} from "./handler";

class CustomEnvironment extends BaseEnvironment {
  handleTestEvent = handler
}
export default CustomEnvironment
