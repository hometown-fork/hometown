# frozen_string_literal: true

class AddIsExclusiveToLists < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :is_exclusive, :boolean # rubocop:disable Rails/ThreeStateBooleanColumn
    change_column_default :lists, :is_exclusive, false # rubocop:disable Rails/ReversibleMigration
  end
end
