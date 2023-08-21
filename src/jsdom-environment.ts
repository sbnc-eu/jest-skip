
import BaseEnvironment from 'jest-environment-jsdom'
import {handler} from "./handler";

class CustomEnvironment extends BaseEnvironment {
  handleTestEvent = handler
}
export default CustomEnvironment
