import { Location } from './locations';

export interface LocationPageComponent {
  (props: { location: Location }): JSX.Element;
}
