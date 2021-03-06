import { toggleGoogleFit } from '@actions/api-actions/google-fit-actions'
import { changeGoogleFitSource } from '@actions/sleep-source-actions/sleep-source-actions'
import EmptyState from 'components/EmptyState'
import SourceRow from 'components/SettingsSpecific/SourceRow'
import TranslatedText from 'components/TranslatedText'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGoogleFitEnabled } from 'store/Selectors/api-selectors/api-selectors'
import {
  getAllGoogleFitSources,
  getGoogleFitSource,
  getIsGoogleFitMainSource
} from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { constants } from 'styles/themes'

const GoogleFitSection = () => {
  const dispatch = useDispatch()
  const sources = useSelector(getAllGoogleFitSources)
  const isGoogleFitMainSource = useSelector(getIsGoogleFitMainSource)
  const healthKitSource = useSelector(getGoogleFitSource)
  const googleFitAuthorized = useSelector(getGoogleFitEnabled)

  const onPress = (sourceId: string) => {
    const source = sources?.find((s) => s.sourceId === sourceId)
    if (source) {
      dispatch(changeGoogleFitSource(source))
    }
  }

  const setGoogleFitAsSource = () => {
    dispatch(toggleGoogleFit())
  }

  const mapped = sources
    ? sources.map((item, key) => (
        <SourceRow
        key={key}
        sourceId={item.sourceId}
        sourceName={item.sourceName}
        selectedSourceId={healthKitSource?.sourceId}
        switchSource={onPress}
        />
      ))
    : []

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <GoogleFitLogo
              source={require('../../../assets/appIcons/google-fit-icon.png')}
            />
            <Title>SOURCE.GOOGLE_FIT</Title>
          </LogoAndTitle>
          <Description>SOURCE.GOGLE_FIT_DESCRIPTION</Description>
        </Column>
        <Switch
          value={isGoogleFitMainSource}
          onValueChange={setGoogleFitAsSource}
        />
      </TitleRow>

      {isGoogleFitMainSource && (
        <Sources>{mapped.length !== 0 ? mapped : <EmptyState />}</Sources>
      )}
    </Container>
  )
}

export default GoogleFitSection

const Container = styled.View`
  padding: 20px;
  margin-bottom: 30px;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
`

const Sources = styled.View``

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const LogoAndTitle = styled.View`
  flex-direction: row;
  align-items: center;
`

const GoogleFitLogo = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 10px;
`

const Title = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Switch = styled.Switch``

const Authorized = styled.Text`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${colors.green};
`

const Description = styled(TranslatedText)`
  margin-top: 10px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Column = styled.View`
  flex-direction: column;
  flex: 1;
`
