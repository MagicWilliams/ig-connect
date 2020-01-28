import App from 'next/app';
import React from 'react';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    this._doSignature()
  }

  _doSignature() {
    var styles = [
         'width: 100vw '
       , 'color: black'
       , 'margin: 100px 20px'
       , 'padding: 100px 20px'
       , 'margin-right: -12px'
       , 'padding-right: 0px'
       , 'padding-bottom: 0px'
       , 'margin-bottom: 0px'
       , 'display: block'
       , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0)'
       , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
       , 'text-align: center'
       , 'font-size: 25px'
       , 'font-family: courier new'
       , 'font-weight: regular'
    ].join(';');

    var style2 = [
       'position: absolute'
       , 'bottom: 100px'
       , 'color: black'
       , 'text-align: center'
       , 'background: #FEFC99'
       , 'font-size: 25px'
       , 'font-family: courier new'
       , 'font-weight: regular'
    ].join(';');


    var style3 = [
       'color: red'
       , 'display: block'
       , 'text-align: center'
       , 'font-size: 14px'
       , 'font-family: courier new'
       , 'font-weight: regular'
       , 'padding: 20px 50px 180px 80px'

    ].join(';');

    console.log('%c Made by %c School \n%c www.schoooool.com', styles, style2, style3);
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <div>
        <Component {...pageProps} key={router.route} />
        <style jsx global>{`
          @font-face {
            font-family: 'IMBPlexMono-regular';
            src: url('/fonts/IBMPlexMono-regular.ttf');
          }

          @font-face {
            font-family: 'Windsor';
            src: url('/fonts/windsor.otf');
          }

          h1 {
            font-family: "Windsor";
          }

          html {
            position: relative;
          }

          body {
            margin: 25px !important;
          }

          a {
            color: black;
          }

          h1,h2,h3,h4,h5,h6,p {
            margin: 0;
          }

          ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          ::selection {
            background: #fefc99;
          }

          * {
            font-family: 'IMBPlexMono-regular', 'Windsor', Courier, monospace;
            font-weight: 400;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: geometricPrecision;
            line-height: 1.45;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
        `}</style>
      </div>
    )
  }
}
