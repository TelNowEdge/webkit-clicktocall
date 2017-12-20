# TelNowEdge Click to Call

## Versions

- 2017/12/20 <1.5>:
    - Add contextual menu to dial selection.
    - Add option to disable DOM writer

- 2017/11/24 <1.4>:
    - Fix missing match for some number
    - Add patterns to match internal numbers

- 2017/11/22 <1.3>: Production version

## Overview

TelNowEdge Click to Call parse html to find all phones number and bind on them a `click event`.
`Click event` listener send an XHR on TelNowEdge system to dial this number on your desk phone.

## Installation

### Firefox ( >=57 )

Install [TelNowEdge Click to call extension](https://addons.mozilla.org/en-US/firefox/addon/telnowedge-click-to-call/)

### Chrome

Install [TelNowEdge Click to call extension](https://chrome.google.com/webstore/detail/telnowedge-click-to-call/nodcomomnjlhcakhgmaagmlckbmfhagn)

## Configuration

## Firefox

1. Open the menu
1. Choose `Add-ons`
1. Click on `preferences` for TelNowEdge extension
1. Fill at least
    - host
    - username

**Note:**
> If you want auto-pickup on your phone you must fill password

## Chrome

1. Open the menu
1. Choose `More tools`
1. Choose `extensions`
1. Click on `Options` for TelNowEdge extension
1. Fill at least
    - host
    - username

**Note:**
> If you want auto-pickup on your phone you must fill password

## F.A.Q.

To avoid mixed content (http XHR on https web site) this extension change protocol and port depends on the website's protocol. So when the XHR is sent over https the `certificat` must be in your `trusted ceritficats`.
