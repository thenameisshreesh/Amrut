from mongoengine import (
    Document,
    StringField,
    DateTimeField
)
import datetime


class DiaryInspection(Document):

    farmer_id = StringField(required=True)
    diary_id = StringField(required=True)

    result = StringField(choices=["pass", "fail"])

    description = StringField()
    proof_image = StringField()

    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {"collection": "diary_inspections"}