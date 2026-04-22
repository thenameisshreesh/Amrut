from flask import Blueprint
from bson import ObjectId

from app.models.farmers import Farmer
from app.utils.responses import success_response, error_response

consumer_bp = Blueprint("consumer", __name__)

@consumer_bp.route('/consumer/safety/<farmer_id>', methods=['GET'])
def consumer_safety(farmer_id):

    try:
        farmer = Farmer.objects(id=ObjectId(farmer_id)).first()

        if not farmer:
            return error_response("Farmer not found", 404)

        return success_response({
            "diary_score": farmer.diary_score,
            "bad_score": farmer.bad_score
        }, 200)

    except Exception as e:
        return error_response(str(e), 500)