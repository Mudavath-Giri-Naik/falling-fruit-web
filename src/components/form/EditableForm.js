import { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { getLocationById, getReviewById } from '../../utils/api'
import { Page } from '../entry/Entry'
import { LocationForm, locationToForm } from './LocationForm'
import { ReviewForm, reviewToForm } from './ReviewForm'

const EditableForm = ({
  Form,
  getFormData,
  convertFormData,
  getRedirectLink,
  ...props
}) => {
  const {
    params: { id },
  } = useRouteMatch()
  const history = useHistory()

  const [formData, setFormData] = useState(null)

  useEffect(() => {
    const loadReview = async () => {
      setFormData(await getFormData(id))
    }

    loadReview()
  }, [id, getFormData])

  return (
    formData && (
      <Form
        initialValues={convertFormData(formData)}
        editingId={id}
        onSubmit={() => history.push(getRedirectLink(formData))}
        {...props}
      />
    )
  )
}

export const EditReview = () => (
  <Page>
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <h3>Editing My Review</h3>
      <EditableForm
        Form={ReviewForm}
        getFormData={getReviewById}
        convertFormData={(review) => ({
          review: reviewToForm(review),
        })}
        getRedirectLink={(review) => `/map/entry/${review.location_id}`}
      />
    </div>
  </Page>
)

export const EditLocation = () => (
  <Page>
    <h3 style={{ marginLeft: 10 }}>Editing Location</h3>
    <EditableForm
      Form={LocationForm}
      getFormData={getLocationById}
      convertFormData={locationToForm}
      getRedirectLink={(location) => `/map/entry/${location.id}`}
    />
  </Page>
)