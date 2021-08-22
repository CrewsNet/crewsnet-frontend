import React from "react"
import { propTypes } from "./Icon.props"
import iconMap from "./svgs/icon-map"

const EmptyIcon = () => <div />

const Icon = ({ name, size, color, ...rest }) => {
  const Icon = iconMap[name] || EmptyIcon
  return <Icon color={color} style={{ width: size, height: size }} {...rest} />
}

Icon.propTypes = propTypes

export default Icon
