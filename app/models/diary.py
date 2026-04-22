from mongoengine import (
    Document,
    StringField,
    BooleanField,
    DateTimeField
)
import datetime


class DiarySeller(Document):

    # Basic Info
    name = StringField(required=True)
    mobile = StringField(required=True, unique=True)

    # Verification
    mobile_verified = BooleanField(default=True)

    # Optional fields
    dairy_name = StringField()
    
    address = StringField()

    # timestamps
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    updated_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {"collection": "diary"}

    def save(self, *args, **kwargs):
        self.updated_at = datetime.datetime.utcnow()
        return super(DiarySeller, self).save(*args, **kwargs)