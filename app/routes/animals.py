from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.animals import Animal
from app.models.farmers import Farmer
from app.utils.responses import success_response, error_response
from app.services.withdrawal_service import WithdrawalService

animals_bp = Blueprint('animals', __name__)

# ------------------------------------------------------
# Create a new animal for logged-in farmer
# ------------------------------------------------------
@animals_bp.route('/', methods=['POST'])
@jwt_required()
def create_animal():
    print("\n[ANIMALS] create_animal CALLED")

    data = request.get_json() or {}
    required_fields = ["species", "breed", "gender", "tag_number"]

    if not all(data.get(f) for f in required_fields):
        print("[ANIMALS] ERROR: Missing required fields")
        return error_response("Missing required fields", 400)

    farmer_id = get_jwt_identity()
    farmer = Farmer.objects(id=farmer_id).first()

    if not farmer:
        print("[ANIMALS] ERROR: Farmer not found")
        return error_response("Farmer not found", 404)

    if Animal.objects(tag_number=data["tag_number"]).first():
        print("[ANIMALS] ERROR: Duplicate tag number")
        return error_response("Tag number already exists", 409)

    animal = Animal(
        farmer=farmer,
        species=data["species"],
        breed=data.get("breed"),
        gender=data.get("gender"),
        age=data.get("age"),
        weight=data.get("weight"),
        tag_number=data["tag_number"],
        is_lactating=data.get("is_lactating", False),
        daily_milk_yield=data.get("daily_milk_yield", 0),
        pregnancy_status=data.get("pregnancy_status", "unknown"),
        profile_photo_path=data.get("profile_photo_path"),
        additional_image_paths=data.get("additional_image_paths", [])
    ).save()

    print(f"[ANIMALS] Animal created: {animal.id}")
    return success_response({
        "_id": str(animal.id)
    }, 201)

# ------------------------------------------------------
# Get single animal (farmer can view only their own)
# ---------------------------------------
@animals_bp.route('/<animal_id>', methods=['GET'])
@jwt_required()
def get_animal(animal_id):
    print(f"\n[ANIMALS] get_animal CALLED: {animal_id}")

    farmer_id = get_jwt_identity()
    animal = Animal.objects(id=animal_id).first()

    if not animal:
        return error_response("Animal not found", 404)

    if str(animal.farmer.id) != farmer_id:
        return error_response("Not allowed", 403)

    return success_response({
        "_id": str(animal.id),
        "farmer": str(animal.farmer.id),
        "species": animal.species,
        "tag_number": animal.tag_number
    }, 200)

# ------------------------------------------------------
# Get all animals of logged-in farmer
# ------------------------------------------------------
@animals_bp.route('/mine', methods=['GET'])
@jwt_required()
def get_my_animals():
    print("\n[ANIMALS] get_my_animals CALLED")

    farmer_id = get_jwt_identity()
    animals = Animal.objects(farmer=farmer_id)

    print(f"[ANIMALS] animals found = {animals.count()}")

    return success_response([
        {
            "_id": str(a.id),
            "species": a.species,
            "tag_number": a.tag_number
        } for a in animals
    ], 200)

# ------------------------------------------------------
# Update animal (owner only)
# ------------------------------------------------------
@animals_bp.route('/<animal_id>', methods=['PUT'])
@jwt_required()
def update_animal(animal_id):
    print(f"\n[ANIMALS] update_animal CALLED: {animal_id}")

    farmer_id = get_jwt_identity()
    data = request.get_json() or {}

    animal = Animal.objects(id=animal_id).first()
    if not animal:
        return error_response("Animal not found", 404)

    if str(animal.farmer.id) != farmer_id:
        return error_response("Not allowed", 403)

    for field in [
        "species", "breed", "gender", "age", "weight",
        "is_lactating", "daily_milk_yield",
        "pregnancy_status", "profile_photo_path",
        "additional_image_paths"
    ]:
        if field in data:
            setattr(animal, field, data[field])

    animal.save()
    print(f"[ANIMALS] Animal updated: {animal.id}")

    return success_response({"_id": str(animal.id)}, 200)

# ------------------------------------------------------
# ✅ GET MY ANIMALS WITH WITHDRAWAL STATUS (FIXED)
# ------------------------------------------------------
@animals_bp.route('/my/withdrawal-status', methods=['GET'])
@jwt_required()
def get_my_animals_with_withdrawal_status():
    print("\n[ANIMALS] get_my_animals_with_withdrawal_status CALLED")

    farmer_id = get_jwt_identity()
    farmer = Farmer.objects(id=farmer_id).first()

    if not farmer:
        return error_response("Farmer not found", 404)

    animals = Animal.objects(farmer=farmer)
    print(f"[ANIMALS] animals found = {animals.count()}")

    if animals.count() == 0:
        return success_response([], 200)

    animal_ids = [str(a.id) for a in animals]
    print(f"[ANIMALS] animal_ids = {animal_ids}")

    alerts = WithdrawalService.get_active_alerts_for_animals(animal_ids)
    print(f"[ANIMALS] active alerts found = {alerts.count()}")

    alert_map = {a.animal_id: a for a in alerts}

    result = []
    for animal in animals:
        aid = str(animal.id)

        result.append({
            "_id": aid,
            "tag_number": animal.tag_number,
            "species": animal.species,
            "withdrawal_status": (
                "UNDER_WITHDRAWAL" if aid in alert_map else "SAFE"
            ),
            "safe_from": (
                alert_map[aid].safe_from if aid in alert_map else None
            )
        })

    print(f"[ANIMALS] response size = {len(result)}")
    return success_response(result, 200)

# ------------------------------------------------------
# ✅ GET ONLY UNSAFE ANIMALS
# ------------------------------------------------------
@animals_bp.route('/my/unsafe', methods=['GET'])
@jwt_required()
def get_unsafe_animals():
    print("\n[ANIMALS] get_unsafe_animals CALLED")

    farmer_id = get_jwt_identity()
    farmer = Farmer.objects(id=farmer_id).first()

    animals = Animal.objects(farmer=farmer)
    animal_ids = [str(a.id) for a in animals]

    alerts = WithdrawalService.get_active_alerts_for_animals(animal_ids)
    alert_map = {a.animal_id: a for a in alerts}

    result = []
    for animal in animals:
        aid = str(animal.id)
        if aid in alert_map:
            result.append({
                "_id": aid,
                "tag_number": animal.tag_number,
                "withdrawal_status": "UNDER_WITHDRAWAL",
                "safe_from": alert_map[aid].safe_from
            })

    print(f"[ANIMALS] unsafe animals found = {len(result)}")
    return success_response(result, 200)
