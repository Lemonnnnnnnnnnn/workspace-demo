interface Props {
    name : string
}

import { Button as B, Result } from "antd";

export function Button({ name }: Props) {
  return <Result>{name}</Result>;
}

export default Button