declare module '*.css' {
  type Styles = {
    [selector: string]: string
  }

  const styles: Styles
  const css: any

  export default styles
}
