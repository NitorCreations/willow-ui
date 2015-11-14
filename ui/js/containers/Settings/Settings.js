import React, { Component, PropTypes } from 'react';
import { CounterButton } from 'components'
console.log ('c=', CounterButton)
export default class Settings extends Component {
    render() {
        return (
            <div>
                <h2>Example of another page (Settings.js)</h2>
                <CounterButton name="FooBar"/>
                <p>
                    <strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit.
                    Integer volutpat id magna sed rutrum. Vestibulum et laoreet enim. Nam
                    consequat nunc lacus, in placerat eros dictum ac. Suspendisse mollis lacinia
                    maximus. Nulla sed consectetur tortor, id varius ipsum. Quisque et tincidunt
                    lorem. Sed ligula sem, tempor ac metus id, fringilla lobortis leo.
                </p>
                <p>
                    Fusce vitae metus arcu. Phasellus vel posuere ex. Aenean eget enim vel justo
                    rhoncus porta. Morbi vitae felis vehicula augue faucibus tincidunt. Aenean
                    porta nisi nec tempor pharetra. Curabitur tortor arcu, sodales in nulla cursus,
                    ullamcorper placerat sapien. Praesent nibh velit, dictum ac tempor id,
                    rutrum vel risus. Mauris et urna nunc. In et diam ac nibh gravida semper.
                    Aliquam imperdiet in erat ut semper. Pellentesque feugiat in nulla a mollis.
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Integer vehicula nulla eu dignissim porttitor. Proin in massa
                    est. Nam non dui nec orci scelerisque fermentum et id magna.
                </p>
            </div>
        )
    }
}