import React from 'react'
import styled from 'styled-components'
import { MarkdownFile } from '../../lib/types'
import { inject, observer } from 'mobx-react'
import Stores from '../../stores'
import { markdownProcessor } from '../../lib/utils'
import reactRenderer from 'remark-react'
import 'github-markdown-css'

interface RendererProps {
  file?: MarkdownFile
  updateFile?: (value: { content: string, id: string }) => void
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
`
const Textarea = styled.textarea`
  resize: none;
  outline: none;
  background-color: black;
  color: white;
  height: 100%;
  width: 100%;
`
const MarkdownContainer = styled.div`
  padding: 20px;
`
const TextareaContainer = styled.div`
  padding: 20px;
  background-color: black;
`

const Renderer: React.SFC<RendererProps> = ({
  file,
  updateFile
}) => {
  return (
    <Container>
      <TextareaContainer>
        <Textarea
          onChange={(e: React.ChangeEvent) => updateFile!({
            content: (e.target as HTMLTextAreaElement).value,
            id: file!.id
          })}
          value={file!.content}
        />
      </TextareaContainer>
      <MarkdownContainer>
        {
          markdownProcessor()
            .use(reactRenderer)
            .processSync(file!.content)
            .contents
        }
      </MarkdownContainer>
    </Container>
  )
}

export default inject((stores: Stores) => ({
  file: stores.currentFileStore.file,
  updateFile: stores.markdownFilesStore.updateFile
}))(observer(Renderer))