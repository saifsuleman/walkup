import React from "react";

export interface ShufflingTextProps {
    text: string[];
    interval: number;
}

export default class ShufflingText extends React.Component<ShufflingTextProps, { index: number }> {
    timeout?: NodeJS.Timer;

    constructor(props: ShufflingTextProps) {
        super(props);
        this.state = { index: 0 };
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
            this.setState({ index: (this.state.index + 1) % this.props.text.length })
        }, this.props.interval)
    }

    componentWillUnmount() {
        if (this.timeout)
            clearInterval(this.timeout)
    }

    render(): JSX.Element {
        const text = this.props.text[this.state.index];
        return <>{text}</>
    }
}